import { useCallback, useEffect, useState } from 'react';
import { createService, deleteService, getServices, updateService, uploadServiceImage } from '../../api/services.api';
import ServiceFormModal from '../../components/admin/ServiceFormModal';
import ServicesTable from '../../components/admin/ServicesTable';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadServices = useCallback(async () => {
    setIsLoading(true); setError('');
    try { const response = await getServices(true); setServices(response.data); }
    catch { setError('تعذر تحميل الخدمات، حاول تحديث الصفحة'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { loadServices(); }, [loadServices]);
  const openCreate = () => { setEditingService(null); setIsModalOpen(true); };
  const openEdit = (service) => { setEditingService(service); setIsModalOpen(true); };

  const handleSubmit = async (payload) => {
    setIsSaving(true); setError('');
    try {
      // إذا تم اختيار ملف صورة، ارفعه أولاً عبر الخادم ثم أضف الحقول الناتجة
      if (payload.imageFile) {
        const formData = new FormData();
        formData.append('image', payload.imageFile);
        const uploadRes = await uploadServiceImage(formData);
        payload.imageUrl = uploadRes.data.imageUrl;
        payload.imagePublicId = uploadRes.data.imagePublicId;
        delete payload.imageFile;
      }

      if (editingService) await updateService(editingService._id, payload);
      else await createService(payload);
      setIsModalOpen(false); setNotice('تم حفظ الخدمة بنجاح'); await loadServices();
    } catch (err) { setError(err.response?.data?.message || 'تعذر حفظ الخدمة'); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async (service) => {
    if (!window.confirm(`هل تريد حذف خدمة «${service.name}»؟`)) return;
    try { await deleteService(service._id); setNotice('تم حذف الخدمة'); await loadServices(); }
    catch (err) { setError(err.response?.data?.message || 'تعذر حذف الخدمة'); }
  };

  const handleToggle = async (service) => {
    setError('');
    setIsSaving(true);
    try {
      await updateService(service._id, { isActive: !service.isActive });
      setNotice(service.isActive ? 'تم تعطيل الخدمة' : 'تم تفعيل الخدمة');
      await loadServices();
    } catch (err) {
      setError(err.response?.data?.message || 'تعذر تغيير حالة الخدمة');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4"><div><h1 className="text-2xl font-bold text-gray-800">الخدمات</h1><p className="mt-1 text-sm text-gray-500">إدارة الخدمات المعروضة في الموقع والحجوزات.</p></div><button onClick={openCreate} className="rounded-lg bg-[#0F766E] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0d6259]">إضافة خدمة</button></div>
      {error && <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {notice && <p className="mb-4 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}
      {isLoading ? <p className="text-gray-500">جاري تحميل الخدمات...</p> : <ServicesTable services={services} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} />}
      {isModalOpen && <ServiceFormModal service={editingService} isSaving={isSaving} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />}
    </div>
  );
};

export default AdminServicesPage;
