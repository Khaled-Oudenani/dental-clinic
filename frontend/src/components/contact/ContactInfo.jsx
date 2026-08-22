import Icon from '../common/Icon';
import { useWorkingHours } from '../../hooks/useWorkingHours';

const DAY_LABELS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const ContactInfo = ({ clinicInfo }) => {
  const { workingHours, isLoading } = useWorkingHours();

  return (
    <div className="md:col-span-5 flex flex-col gap-6">
      <div className="bg-secondary-container rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
            <Icon name="location_on" soft />
          </div>
          <div>
            <h3 className="font-body text-sm text-primary font-bold mb-1">العنوان</h3>
            <p className="font-body text-on-surface-variant">
              {clinicInfo?.address || 'لم يتم إضافة العنوان بعد'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
            <Icon name="phone" soft />
          </div>
          <div>
            <h3 className="font-body text-sm text-primary font-bold mb-1">الهاتف</h3>
            <p className="font-body text-on-surface-variant" dir="ltr">
              {clinicInfo?.phone || '—'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
            <Icon name="mail" soft />
          </div>
          <div>
            <h3 className="font-body text-sm text-primary font-bold mb-1">البريد الإلكتروني</h3>
            <p className="font-body text-on-surface-variant">{clinicInfo?.email || '—'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-secondary-container rounded-xl p-6 medical-shadow">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Icon name="schedule" soft />
          <h2 className="font-display text-lg font-semibold">ساعات العمل</h2>
        </div>

        {isLoading && (
          <p className="font-body text-on-surface-variant text-sm">جاري التحميل...</p>
        )}

        {!isLoading && (
          <ul className="space-y-3 font-body text-on-surface-variant">
            {[...workingHours]
              .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
              .map((wh) => (
                <li
                  key={wh.dayOfWeek}
                  className="flex justify-between items-center border-b border-secondary-container pb-2 last:border-0"
                >
                  <span>{DAY_LABELS_AR[wh.dayOfWeek]}</span>
                  <span className={wh.isOpen ? 'text-primary font-medium' : 'text-outline'}>
                    {wh.isOpen ? `${wh.openTime} - ${wh.closeTime}` : 'مغلق'}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;