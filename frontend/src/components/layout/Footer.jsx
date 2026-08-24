import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import { getClinicInfo } from '../../api/clinicInfo.api';
// import { useWorkingHours } from '../../hooks/useWorkingHours';

// const DAY_LABELS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const Footer = () => {
  const [clinicInfo, setClinicInfo] = useState(null);
  // const { workingHours } = useWorkingHours();

  useEffect(() => {
    const loadClinicInfo = async () => {
      try {
        const res = await getClinicInfo();
        setClinicInfo(res.data);
      } catch (err) {
        setClinicInfo(null);
      }
    };
    loadClinicInfo();
  }, []);

  // نعرض فقط اليوم الأول المفتوح واليوم الأول المغلق كملخص مختصر فـ الفوتر
  // const firstOpenDay = [...workingHours].sort((a, b) => a.dayOfWeek - b.dayOfWeek).find((wh) => wh.isOpen);

  return (
    <footer className="w-full mt-auto bg-surface-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-[120px] py-10 max-w-[1200px] mx-auto text-right">
        <div className="col-span-1 md:col-span-2">
          <Link
            to="/"
            className="font-display text-2xl font-bold text-primary flex items-center gap-2 mb-6"
          >
            <Icon name="dentistry" soft className="text-[32px] text-primary" />
            Khaled Dental
          </Link>
          <p className="font-body text-on-surface-variant mb-6 max-w-sm">
            © {new Date().getFullYear()} عيادة Khaled Dental. جميع الحقوق محفوظة.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-body text-lg text-on-background font-semibold mb-4">تواصل معنا</h4>
          <ul className="flex flex-col gap-3">
            <li>
              {clinicInfo?.phone ? (
                <a
                  className="font-body text-on-surface-variant hover:text-primary transition-colors"
                  href={`tel:${clinicInfo.phone}`}
                  dir="ltr"
                >
                  {clinicInfo.phone}
                </a>
              ) : (
                <span className="font-body text-on-surface-variant">الهاتف: غير متوفر</span>
              )}
            </li>
            <li className="font-body text-on-surface-variant">
              {clinicInfo?.address || 'العنوان: غير متوفر'}
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-body text-lg text-on-background font-semibold mb-4">زورونا</h4>
          <ul className="flex flex-col gap-3">
            {/* <li className="font-body text-on-surface-variant">
              {firstOpenDay
                ? `${DAY_LABELS_AR[firstOpenDay.dayOfWeek]}: ${firstOpenDay.openTime} - ${firstOpenDay.closeTime}`
                : 'أوقات العمل غير محددة بعد'}
            </li> */}
            <li>
              <Link
                to="/contact"
                className="font-body text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
              >
                عرض كل الأوقات والخريطة <Icon name="map" className="text-[18px]" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;