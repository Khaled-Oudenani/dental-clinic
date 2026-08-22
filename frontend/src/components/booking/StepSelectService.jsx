import { useEffect, useState } from 'react';
import { getServices } from '../../api/services.api';
import Icon from '../common/Icon';

const StepSelectService = ({ selectedServiceId, onSelect, onNext }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await getServices();
        setServices(res.data);

        // إذا وصل المستخدم من زر "احجز الخدمة" فـ صفحة الخدمات، نختارها تلقائياً
        if (selectedServiceId) {
          const match = res.data.find((service) => service._id === selectedServiceId);
          if (match) onSelect(match);
        }
      } finally {
        setIsLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    loadServices();
  }, []);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-on-background mb-6">
        اختر الخدمة المطلوبة
      </h2>

      {isLoading && <p className="text-on-surface-variant">جاري التحميل...</p>}

      {!isLoading && services.length === 0 && (
        <p className="text-on-surface-variant">لا توجد خدمات متاحة حالياً</p>
      )}

      {!isLoading && services.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => {
            const isSelected = service._id === selectedServiceId;
            return (
              <button
                key={service._id}
                type="button"
                onClick={() => onSelect(service)}
                className={`text-right border rounded-lg p-4 transition-all hover:-translate-y-0.5 ${
                  isSelected
                    ? 'border-primary bg-secondary-container'
                    : 'border-outline-variant hover:border-primary/50'
                }`}
              >
                <Icon name={service.icon} className="text-primary text-3xl" />
                <h3 className="font-display text-lg font-semibold mt-3 mb-1">{service.name}</h3>
                <p className="font-body text-sm text-on-surface-variant mb-2 line-clamp-2">
                  {service.description}
                </p>
                <span className="font-body text-sm text-primary font-medium">
                  {service.price === null
                    ? service.priceLabel
                    : `${service.priceLabel} ${service.price.toLocaleString('ar-DZ')} دج`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          disabled={!selectedServiceId}
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

export default StepSelectService;