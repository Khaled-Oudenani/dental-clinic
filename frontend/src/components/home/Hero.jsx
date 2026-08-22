import { Link } from 'react-router-dom';
import Icon from '../common/Icon';


const Hero = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-[120px] py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 bg-secondary-container/50 text-on-secondary-container rounded-full px-4 py-2 w-fit mb-2">
            <Icon name="verified" className="text-[18px]" />
           
            <span className="font-body text-sm font-medium">رعاية طبية معتمدة</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
            ابتسامتك تستحق <br />
            أفضل رعاية
          </h1>

          <p className="font-body text-lg text-on-surface-variant max-w-lg mt-2">
            نقدم رعاية طبية متكاملة بأحدث التقنيات لضمان راحتك وجمال ابتسامتك. اكتشف تجربة طب أسنان
            مختلفة تجمع بين الاحترافية والهدوء.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center bg-primary text-on-primary font-medium px-8 py-4 rounded-full hover:opacity-90 transition-colors shadow-md hover:shadow-lg"
            >
              احجز الآن
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center border border-outline-variant text-primary font-medium px-8 py-4 rounded-full hover:bg-surface-container transition-colors"
            >
              عرض الخدمات
            </Link>
          </div>
        </div>

        <div className="relative h-[320px] lg:h-[440px] w-full rounded-[2rem] overflow-hidden medical-shadow border border-outline-variant/30 bg-gradient-to-br from-secondary-container to-primary-container/20">
          <img
            src="/dental.jpg"
            alt="طبيب الأسنان"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;