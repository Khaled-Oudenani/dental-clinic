import Icon from '../common/Icon';

const steps = [
  { number: 1, label: 'اختيار الخدمة' },
  { number: 2, label: 'اختيار الموعد' },
  { number: 3, label: 'التأكيد' },
];

const BookingStepper = ({ currentStep }) => {
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="flex items-center justify-between mb-12 relative">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant -z-10 -translate-y-1/2" />
      <div
        className="absolute top-1/2 right-0 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />

      {steps.map((step) => {
        const isActive = step.number <= currentStep;
        const isDone = step.number < currentStep;

        return (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-display font-semibold mb-2 transition-colors bg-white ${
                isActive
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-high text-on-surface-variant border-outline-variant'
              }`}
            >
              {isDone ? <Icon name="check" className="text-[20px]" /> : step.number}
            </div>
            <span
              className={`font-body text-sm ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BookingStepper;