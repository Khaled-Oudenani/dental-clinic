import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../common/Icon';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/services', label: 'الخدمات والأسعار' },
  { to: '/contact', label: 'اتصل بنا' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="flex flex-row-reverse justify-between items-center px-4 md:px-[120px] max-w-[1200px] mx-auto h-20">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="font-display text-2xl font-bold text-primary flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 duration-200"
        >
          <Icon name="dentistry" soft className="text-[32px] text-primary" />
          Khaled Dental
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-body text-lg pb-1 transition-all active:scale-95 duration-200 ${
                  isActive
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavLink
            to="/booking"
            onClick={closeMenu}
            className="hidden md:inline-flex items-center justify-center bg-tertiary-container text-on-tertiary-container font-medium text-sm px-6 py-3 rounded-full hover:bg-tertiary-fixed transition-colors active:scale-95 duration-200"
          >
            احجز الآن
          </NavLink>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
            className="md:hidden text-primary p-2 hover:bg-surface-container rounded-full transition-colors"
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* قائمة الموبايل - تنسدل تحت الهيدر، تختفي أوتوماتيكياً عند اختيار رابط */}
      {isMenuOpen && (
        <nav className="md:hidden bg-surface border-t border-outline-variant/30 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={closeMenu}
              className={({ isActive }) =>
                `font-body text-lg px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-secondary-container/50 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/booking"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center bg-tertiary-container text-on-tertiary-container font-medium text-sm px-6 py-3 rounded-full active:scale-95 duration-200"
          >
            احجز الآن
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;