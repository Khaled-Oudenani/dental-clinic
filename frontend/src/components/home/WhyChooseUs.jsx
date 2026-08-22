import Icon from '../common/Icon';

const features = [
  {
    icon: 'school',
    title: 'خبرة طويلة',
    description: 'فريق طبي متميز يمتلك سنوات من الخبرة في مختلف تخصصات طب الأسنان.',
  },
  {
    icon: 'medical_services',
    title: 'أجهزة حديثة',
    description: 'نستخدم أحدث التقنيات والمعدات لضمان تشخيص دقيق وعلاج فعال وسريع.',
  },
  {
    icon: 'stethoscope',
    title: 'أطباء متخصصون',
    description: 'نخبة من الاستشاريين والأخصائيين لتقديم رعاية شاملة تحت سقف واحد.',
  },
  {
    icon: 'spa',
    title: 'راحة المريض',
    description: 'بيئة هادئة ومريحة مصممة خصيصاً للتخلص من قلق زيارة طبيب الأسنان.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-[120px] py-12">
      <div className="text-center mb-12">
        <h2 className="font-display text-2xl font-semibold text-on-background mb-4">
          لماذا تختار عيادة لومينا؟
        </h2>
        <p className="font-body text-on-surface-variant max-w-2xl mx-auto">
          نلتزم بتقديم أعلى معايير الجودة في بيئة مصممة لراحتك التامة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl p-6 medical-shadow border border-outline-variant hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-6">
              <Icon name={feature.icon} soft className="text-primary text-[28px]" />
            </div>
            <h3 className="font-body text-lg text-primary font-semibold mb-2">{feature.title}</h3>
            <p className="font-body text-on-surface-variant">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;