import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../api/services.api';
import Icon from '../common/Icon';

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await getServices();
        setServices(res.data.slice(0, 4)); // أول 4 خدمات مفعّلة فقط فـ الصفحة الرئيسية
      } catch (err) {
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <section className="bg-surface-container-low py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-[120px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-on-background mb-4">
              خدماتنا المميزة
            </h2>
            <p className="font-body text-on-surface-variant max-w-xl">
              نقدم مجموعة واسعة من العلاجات للحفاظ على صحة وجمال أسنانك.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:opacity-80 transition-colors group whitespace-nowrap"
          >
            عرض كل الخدمات
            <Icon
              name="arrow_forward"
              className="text-[18px] rtl:-scale-x-100 group-hover:-translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {isLoading && <p className="text-on-surface-variant">جاري التحميل...</p>}

        {!isLoading && services.length === 0 && (
          <p className="text-on-surface-variant">لا توجد خدمات متاحة حالياً</p>
        )}

        {!isLoading && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl overflow-hidden medical-shadow border border-outline-variant/50 flex flex-col"
              >
                <div className="relative h-40 bg-secondary-container/30 flex items-center justify-center overflow-hidden">
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Icon name={service.icon} className="text-[64px] text-primary/80" />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-body text-lg text-on-background font-semibold mb-2">
                    {service.name}
                  </h3>
                  <p className="font-body text-on-surface-variant mb-6 flex-1 text-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-medium text-sm text-primary">{service.priceLabel}</span>
                    {service.price === null ? (
                      <Icon name="info" className="text-primary" />
                    ) : (
                      <span className="font-body text-lg font-bold text-on-background">
                        {service.price.toLocaleString('ar-DZ')} دج
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;