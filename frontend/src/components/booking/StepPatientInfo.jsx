import { useState } from 'react';

const StepPatientInfo = ({ service, dateLabel, timeLabel, onBack, onSubmit, isSubmitting, error }) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ patientName, phone, notes });
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-on-background mb-6">
        بيانات المريض
      </h2>

      <form onSubmit={handleSubmit} id="booking-form" className="space-y-4 mb-8">
        <div>
          <label className="block font-body text-sm text-on-surface mb-1">الاسم الكامل</label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="أدخل اسمك الكامل"
            className="w-full border border-outline-variant rounded-md px-4 py-3 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-on-surface mb-1">رقم الهاتف</label>
          <input
            type="tel"
            required
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0X XX XX XX XX"
            className="w-full border border-outline-variant rounded-md px-4 py-3 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow text-right"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-on-surface mb-1">
            ملاحظات إضافية (اختياري)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أي معلومات تود إضافتها للطبيب..."
            className="w-full border border-outline-variant rounded-md px-4 py-3 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
          />
        </div>
      </form>

      <div className="bg-secondary-container rounded-lg p-4 mb-8">
        <h3 className="font-display text-lg text-on-secondary-container font-semibold mb-3 border-b border-outline-variant/30 pb-2">
          ملخص الحجز
        </h3>
        <div className="space-y-2 font-body text-on-secondary-container">
          <div className="flex justify-between">
            <span className="text-sm opacity-80">الخدمة:</span>
            <span className="font-semibold">{service?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm opacity-80">التاريخ:</span>
            <span>{dateLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm opacity-80">الوقت:</span>
            <span>{timeLabel}</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
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
          type="submit"
          form="booking-form"
          disabled={isSubmitting}
          className="bg-tertiary-container text-on-tertiary-container px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all disabled:opacity-60"
        >
          {isSubmitting ? 'جاري التأكيد...' : 'تأكيد الحجز'}
        </button>
      </div>
    </div>
  );
};

export default StepPatientInfo;