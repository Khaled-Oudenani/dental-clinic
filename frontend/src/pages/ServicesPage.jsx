import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/services.api';
import CategoryFilter from '../components/services/CategoryFilter';
import ServiceCard from '../components/services/ServiceCard';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await getServices();
        setServices(res.data);
      } catch (err) {
        setError('تعذر تحميل الخدمات، حاول تحديث الصفحة');
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const filteredServices =
    selectedCategory === 'الكل'
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <main className="max-w-[1200px] w-full mx-auto px-4 md:px-[120px] py-12 space-y-16">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-primary">
          خدماتنا وأسعارنا
        </h1>
        <p className="font-body text-lg text-on-surface-variant">
          نقدم في خالد لطب الأسنان مجموعة شاملة من الخدمات العلاجية والتجميلية، مع التزامنا التام
          بالشفافية في الأسعار والجودة في تقديم الرعاية الصحية لابتسامة تدوم.
        </p>
      </section>

      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

      {isLoading && <p className="text-center text-on-surface-variant">جاري التحميل...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!isLoading && !error && filteredServices.length === 0 && (
        <p className="text-center text-on-surface-variant">لا توجد خدمات فـ هذا التصنيف حالياً</p>
      )}

      {!isLoading && !error && filteredServices.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </section>
      )}

      <section className="bg-primary-container rounded-xl p-12 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, var(--color-on-primary-container) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 space-y-4 max-w-xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-primary-container">
            هل أنت مستعد لابتسامة جديدة؟
          </h2>
          <p className="font-body text-lg text-on-primary-container/80">
            احجز موعدك اليوم للحصول على استشارة شاملة وتقييم لحالتك من قبل فريقنا المتخصص.
          </p>
          <Link
            to="/booking"
            className="inline-block bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all shadow-md"
          >
            احجز موعدك اليوم
          </Link>
        </div>
      </section>

      <p className="text-center font-body text-sm text-outline">
        * الأسعار المذكورة أعلاه تقريبية وقد تختلف بناءً على تشخيص الحالة الفردية وتعقيد العلاج
        المطلوب.
      </p>
    </main>
  );
};

export default ServicesPage;