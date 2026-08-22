import { SERVICE_CATEGORIES } from '../../constants';

const CategoryFilter = ({ selected, onSelect }) => {
  const options = ['الكل', ...SERVICE_CATEGORIES];

  return (
    <section className="flex flex-wrap justify-center gap-2">
      {options.map((option) => {
        const isActive = option === selected;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container'
            }`}
          >
            {option}
          </button>
        );
      })}
    </section>
  );
};

export default CategoryFilter;