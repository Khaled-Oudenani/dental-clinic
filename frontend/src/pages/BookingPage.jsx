// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { createAppointment } from '../api/appointments.api';
// import { getWorkingHours } from '../api/workingHours.api';
// import BookingStepper from '../components/booking/BookingStepper';
// import StepSelectService from '../components/booking/StepSelectService';
// import StepSelectDateTime from '../components/booking/StepSelectDateTime';
// import StepPatientInfo from '../components/booking/StepPatientInfo';
// import Icon from '../components/common/Icon';

// const DAY_LABELS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

// const formatDateLabel = (isoDate) => {
//   if (!isoDate) return '';
//   const date = new Date(isoDate);
//   return date.toLocaleDateString('ar-DZ-u-nu-latn', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });
// };

// const BookingPage = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const preselectedServiceId = searchParams.get('service');

//   const [step, setStep] = useState(1);
//   const [selectedService, setSelectedService] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');
//   const [isDone, setIsDone] = useState(false);
//   const [workingHours, setWorkingHours] = useState([]);

//   useEffect(() => {
//     const loadWorkingHours = async () => {
//       try {
//         const res = await getWorkingHours();
//         setWorkingHours(res.data);
//       } catch (err) {
//         setWorkingHours([]);
//       }
//     };
//     loadWorkingHours();
//   }, []);

//   const handleSubmit = async ({ patientName, phone, notes }) => {
//     setIsSubmitting(true);
//     setSubmitError('');

//     try {
//       await createAppointment({
//         patientName,
//         phone,
//         notes,
//         service: selectedService._id,
//         date: selectedDate,
//         timeSlot: selectedTime,
//       });
//       setIsDone(true);
//     } catch (err) {
//       setSubmitError(err.response?.data?.message || 'حدث خطأ أثناء تأكيد الحجز، حاول مرة أخرى');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isDone) {
//     return (
//       <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
//         <div className="w-20 h-20 bg-secondary-container text-primary rounded-full flex items-center justify-center mx-auto mb-6">
//           <Icon name="check_circle" soft className="text-4xl" />
//         </div>
//         <h2 className="font-display text-3xl text-primary font-bold mb-4">
//           تم تأكيد حجزك بنجاح!
//         </h2>
//         <p className="font-body text-lg text-on-surface-variant mb-8 max-w-md mx-auto">
//           تم تسجيل موعدك فـ عيادة لومينا بنجاح. سنتواصل معك قريباً لتأكيد الموعد.
//         </p>
//         <button
//           onClick={() => navigate('/')}
//           className="bg-surface text-on-surface border border-outline-variant px-6 py-3 rounded-full font-medium hover:bg-surface-container transition-colors"
//         >
//           العودة للرئيسية
//         </button>
//       </div>
//     );
//   }

//   return (
//     <main className="max-w-[1200px] mx-auto px-4 md:px-[120px] py-12">
//       <div className="mb-10 text-center">
//         <h1 className="font-display text-3xl font-bold text-primary mb-2">حجز موعد</h1>
//         <p className="font-body text-on-surface-variant">
//           الرجاء إكمال الخطوات أدناه لحجز موعدك فـ عيادة لومينا.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         <div className="lg:col-span-8 bg-white rounded-xl p-6 medical-shadow border border-outline-variant/50">
//           <BookingStepper currentStep={step} />

//           {step === 1 && (
//             <StepSelectService
//               selectedServiceId={selectedService?._id || preselectedServiceId}
//               onSelect={setSelectedService}
//               onNext={() => setStep(2)}
//             />
//           )}

//           {step === 2 && (
//             <StepSelectDateTime
//               serviceId={selectedService._id}
//               selectedDate={selectedDate}
//               selectedTime={selectedTime}
//               onSelectDate={setSelectedDate}
//               onSelectTime={setSelectedTime}
//               onNext={() => setStep(3)}
//               onBack={() => setStep(1)}
//             />
//           )}

//           {step === 3 && (
//             <StepPatientInfo
//               service={selectedService}
//               dateLabel={formatDateLabel(selectedDate)}
//               timeLabel={selectedTime}
//               onBack={() => setStep(2)}
//               onSubmit={handleSubmit}
//               isSubmitting={isSubmitting}
//               error={submitError}
//             />
//           )}
//         </div>

//         <div className="lg:col-span-4 space-y-6">
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/50">
//             <div className="flex items-center gap-2 mb-4 text-primary">
//               <Icon name="schedule" />
//               <h3 className="font-display text-lg font-semibold">ساعات العمل</h3>
//             </div>
//             <ul className="space-y-3 font-body text-on-surface-variant text-sm">
//               {[...workingHours]
//                 .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
//                 .map((wh) => (
//                   <li
//                     key={wh.dayOfWeek}
//                     className="flex justify-between items-center border-b border-outline-variant/20 pb-2 last:border-0 last:pb-0"
//                   >
//                     <span>{DAY_LABELS_AR[wh.dayOfWeek]}</span>
//                     <span
//                       className={
//                         wh.isOpen ? 'font-medium text-on-surface' : 'font-medium text-red-600'
//                       }
//                     >
//                       {wh.isOpen ? `${wh.openTime} - ${wh.closeTime}` : 'مغلق'}
//                     </span>
//                   </li>
//                 ))}
//             </ul>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/50">
//             <div className="flex items-center gap-2 mb-4 text-primary">
//               <Icon name="info" />
//               <h3 className="font-display text-lg font-semibold">سياسة الإلغاء</h3>
//             </div>
//             <p className="font-body text-on-surface-variant text-sm leading-relaxed">
//               نقدر وقتكم ووقت أطبائنا. نرجو منكم إشعارنا قبل 24 ساعة على الأقل فـ حال الرغبة فـ
//               إلغاء أو تأجيل الموعد.
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default BookingPage;

// new

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createAppointment } from '../api/appointments.api';
import { useWorkingHours } from '../hooks/useWorkingHours';
import BookingStepper from '../components/booking/BookingStepper';
import StepSelectService from '../components/booking/StepSelectService';
import StepSelectDateTime from '../components/booking/StepSelectDateTime';
import StepPatientInfo from '../components/booking/StepPatientInfo';
import Icon from '../components/common/Icon';

const DAY_LABELS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const formatDateLabel = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleDateString('ar-DZ-u-nu-latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedServiceId = searchParams.get('service');

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDone, setIsDone] = useState(false);
  const { workingHours } = useWorkingHours();

  const handleSubmit = async ({ patientName, phone, notes }) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await createAppointment({
        patientName,
        phone,
        notes,
        service: selectedService._id,
        date: selectedDate,
        timeSlot: selectedTime,
      });
      setIsDone(true);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'حدث خطأ أثناء تأكيد الحجز، حاول مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-secondary-container text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="check_circle" soft className="text-4xl" />
        </div>
        <h2 className="font-display text-3xl text-primary font-bold mb-4">
          تم تأكيد حجزك بنجاح!
        </h2>
        <p className="font-body text-lg text-on-surface-variant mb-8 max-w-md mx-auto">
          تم تسجيل موعدك فـ عيادة لومينا بنجاح. سنتواصل معك قريباً لتأكيد الموعد.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-surface text-on-surface border border-outline-variant px-6 py-3 rounded-full font-medium hover:bg-surface-container transition-colors"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-[120px] py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-primary mb-2">حجز موعد</h1>
        <p className="font-body text-on-surface-variant">
          الرجاء إكمال الخطوات أدناه لحجز موعدك فـ عيادة لومينا.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-xl p-6 medical-shadow border border-outline-variant/50">
          <BookingStepper currentStep={step} />

          {step === 1 && (
            <StepSelectService
              selectedServiceId={selectedService?._id || preselectedServiceId}
              onSelect={setSelectedService}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepSelectDateTime
              serviceId={selectedService._id}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={setSelectedDate}
              onSelectTime={setSelectedTime}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepPatientInfo
              service={selectedService}
              dateLabel={formatDateLabel(selectedDate)}
              timeLabel={selectedTime}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={submitError}
            />
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/50">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Icon name="schedule" />
              <h3 className="font-display text-lg font-semibold">ساعات العمل</h3>
            </div>
            <ul className="space-y-3 font-body text-on-surface-variant text-sm">
              {[...workingHours]
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                .map((wh) => (
                  <li
                    key={wh.dayOfWeek}
                    className="flex justify-between items-center border-b border-outline-variant/20 pb-2 last:border-0 last:pb-0"
                  >
                    <span>{DAY_LABELS_AR[wh.dayOfWeek]}</span>
                    <span
                      className={
                        wh.isOpen ? 'font-medium text-on-surface' : 'font-medium text-red-600'
                      }
                    >
                      {wh.isOpen ? `${wh.openTime} - ${wh.closeTime}` : 'مغلق'}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/50">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Icon name="info" />
              <h3 className="font-display text-lg font-semibold">سياسة الإلغاء</h3>
            </div>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed">
              نقدر وقتكم ووقت أطبائنا. نرجو منكم إشعارنا قبل 24 ساعة على الأقل فـ حال الرغبة فـ
              إلغاء أو تأجيل الموعد.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;