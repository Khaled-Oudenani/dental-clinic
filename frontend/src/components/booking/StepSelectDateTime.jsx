import { useEffect, useMemo, useState } from 'react';
import { getAvailableSlots } from '../../api/appointments.api';
import { getWorkingHours } from '../../api/workingHours.api';
import Icon from '../common/Icon';

const WEEKDAY_LABELS = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
const MONTH_LABELS_AR = [
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
  'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const StepSelectDateTime = ({
  serviceId,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onNext,
  onBack,
}) => {
  const [viewMonth, setViewMonth] = useState(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [workingHours, setWorkingHours] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    const loadWorkingHours = async () => {
      try {
        const res = await getWorkingHours();
        setWorkingHours(res.data);
      } catch (err) {
        setWorkingHours([]);
      }
    };
    loadWorkingHours();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    const loadSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const res = await getAvailableSlots(selectedDate, serviceId);
        setSlots(res.data);
      } catch (err) {
        setSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    loadSlots();
  }, [selectedDate, serviceId]);

  const closedWeekdays = useMemo(
    () => new Set(workingHours.filter((wh) => !wh.isOpen).map((wh) => wh.dayOfWeek)),
    [workingHours]
  );

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const calendarCells = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlanks = firstDay.getDay(); // 0 = أحد، مطابق لـ dayOfWeek فـ الباك اند

    const cells = Array.from({ length: leadingBlanks }, () => null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }
    return cells;
  }, [viewMonth]);

  const changeMonth = (delta) => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const handleSelectDay = (date) => {
    onSelectDate(toISODate(date));
    onSelectTime(null);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-on-background mb-6">
        اختر التاريخ والوقت
      </h2>

      <div className="bg-surface rounded-lg p-4 border border-outline-variant mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"
            aria-label="الشهر السابق"
          >
            <Icon name="chevron_right" />
          </button>
          <span className="font-display text-lg font-semibold">
            {MONTH_LABELS_AR[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          </span>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"
            aria-label="الشهر التالي"
          >
            <Icon name="chevron_left" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} className="font-body text-xs text-outline py-2">
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarCells.map((date, index) => {
            if (!date) return <div key={`blank-${index}`} />;

            const isPast = date < today;
            const isClosedDay = closedWeekdays.has(date.getDay());
            const isDisabled = isPast || isClosedDay;
            const isSelected = selectedDate === toISODate(date);

            return (
              <button
                type="button"
                key={date.toISOString()}
                disabled={isDisabled}
                onClick={() => handleSelectDay(date)}
                className={`py-2 rounded-full font-body text-sm transition-colors ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : isDisabled
                      ? 'text-outline-variant cursor-not-allowed'
                      : 'hover:bg-secondary-container text-on-surface'
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <>
          <h3 className="font-body text-sm text-on-surface-variant mb-3">الأوقات المتاحة</h3>

          {isLoadingSlots && (
            <p className="text-on-surface-variant text-sm mb-6">جاري تحميل الأوقات...</p>
          )}

          {!isLoadingSlots && slots.length === 0 && (
            <p className="text-on-surface-variant text-sm mb-6">
              لا توجد أوقات متاحة فـ هذا اليوم، جرب يوم آخر
            </p>
          )}

          {!isLoadingSlots && slots.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelectTime(slot)}
                  className={`border rounded-md py-2 font-body text-sm transition-colors ${
                    selectedTime === slot
                      ? 'bg-primary text-on-primary border-primary'
                      : 'border-outline-variant text-on-surface hover:border-primary hover:text-primary'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-on-surface-variant hover:text-primary px-4 py-2 font-medium transition-colors"
        >
          السابق
        </button>
        <button
          type="button"
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
          className="bg-primary text-on-primary px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          التالي
          <Icon name="arrow_back" className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default StepSelectDateTime;