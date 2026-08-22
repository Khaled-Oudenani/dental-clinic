import { useEffect, useState } from 'react';
import { getClinicInfo } from '../api/clinicInfo.api';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Icon from '../components/common/Icon';

const ContactPage = () => {
  const [clinicInfo, setClinicInfo] = useState(null);

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

  const whatsappHref = clinicInfo?.whatsapp
    ? `https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}`
    : null;

  const hasMapCoords = Boolean(clinicInfo?.mapLat && clinicInfo?.mapLng);

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-[120px] py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-primary mb-2">
          تواصل معنا
        </h1>
        <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto">
          نحن هنا للإجابة على جميع استفساراتك وتقديم أفضل رعاية لابتسامتك. لا تتردد فـ الاتصال بنا
          أو حجز موعد.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <ContactForm />
        <ContactInfo clinicInfo={clinicInfo} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* خريطة حقيقية إذا كانت الإحداثيات محفوظة فـ لوحة التحكم، وإلا نموذج بديل */}
        <div className="md:col-span-2 rounded-xl overflow-hidden border border-secondary-container medical-shadow h-[300px] relative bg-surface-container">
          {hasMapCoords ? (
            <iframe
              title="موقع العيادة"
              src={`https://www.google.com/maps?q=${clinicInfo.mapLat},${clinicInfo.mapLng}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/50 text-center p-4">
              <Icon name="map" className="text-[48px] mb-2" />
              <span className="font-body text-on-surface-variant">
                لم يتم تحديد موقع العيادة على الخريطة بعد
              </span>
            </div>
          )}
        </div>

        <div className="md:col-span-1 flex flex-col gap-4">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white rounded-xl p-6 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-sm h-full max-h-[140px]"
            >
              <Icon name="chat" className="text-[32px]" />
              <span className="font-display text-lg font-semibold">تواصل عبر واتساب</span>
            </a>
          ) : (
            <div className="bg-surface-container rounded-xl p-6 flex items-center justify-center text-on-surface-variant text-sm h-full max-h-[140px] text-center">
              رقم واتساب غير متوفر حالياً
            </div>
          )}

          {(clinicInfo?.socialLinks?.facebook || clinicInfo?.socialLinks?.instagram) && (
            <div className="bg-white border border-secondary-container rounded-xl p-4 flex items-center justify-center gap-4 medical-shadow">
              {clinicInfo?.socialLinks?.facebook && (
                <a
                  href={clinicInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:opacity-80 transition-colors bg-secondary-container p-2 rounded-full"
                >
                  <Icon name="public" />
                </a>
              )}
              {clinicInfo?.socialLinks?.instagram && (
                <a
                  href={clinicInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:opacity-80 transition-colors bg-secondary-container p-2 rounded-full"
                >
                  <Icon name="photo_camera" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactPage;