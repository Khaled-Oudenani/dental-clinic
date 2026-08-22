import { Link } from 'react-router-dom';
import Icon from '../common/Icon';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-secondary-container hover:border-primary transition-colors flex flex-col md:flex-row gap-4 group">
      <div className="relative bg-secondary-container rounded-lg flex items-center justify-center h-20 w-20 md:h-auto md:w-32 shrink-0 overflow-hidden">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Icon
            name={service.icon}
            className="text-primary text-[40px] group-hover:scale-110 transition-transform"
          />
        )}
      </div>

      <div className="flex flex-col flex-grow justify-between gap-2">
        <div>
          <h3 className="font-display text-xl font-semibold text-on-surface">{service.name}</h3>
          <p className="font-body text-on-surface-variant line-clamp-2 mt-1">
            {service.description}
          </p>
        </div>

        <div className="flex items-end justify-between mt-auto pt-2 border-t border-outline-variant/30">
          <div>
            <span className="block font-body text-xs text-outline">{service.priceLabel}</span>
            {service.price !== null && (
              <span className="font-display text-xl font-semibold text-primary">
                {service.price.toLocaleString('ar-DZ')} دج
              </span>
            )}
          </div>

          {/* نمرر معرّف الخدمة كـ query param باش صفحة الحجز تختارها تلقائياً */}
          <Link
            to={`/booking?service=${service._id}`}
            className="text-primary hover:bg-secondary-container px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-1"
          >
            احجز الخدمة
            <Icon name="arrow_back" className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;