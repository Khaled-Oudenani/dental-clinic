import { useEffect, useState } from 'react';

const categories = ['عام', 'تجميلي', 'جراحي', 'أطفال'];
const emptyForm = { name: '', description: '', category: 'عام', price: '', priceLabel: 'ابتداءً من', durationMinutes: 30, icon: 'dentistry', order: 0, isActive: true };

const ServiceFormModal = ({ service, isSaving, onClose, onSubmit }) => {
  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    setForm(service ? {
      name: service.name || '', description: service.description || '', category: service.category || 'عام',
      price: service.price ?? '', priceLabel: service.priceLabel || 'ابتداءً من',
      durationMinutes: service.durationMinutes || 30, icon: service.icon || 'dentistry',
      order: service.order || 0, isActive: service.isActive !== false,
    } : emptyForm);

    // show existing image when editing
    if (service && service.imageUrl) {
      setPreviewUrl(service.imageUrl);
    } else {
      setPreviewUrl('');
    }
    setSelectedFile(null);
  }, [service]);

  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // include selectedFile in payload as imageFile for the parent to upload
    onSubmit({ ...form, price: form.price === '' ? null : Number(form.price), durationMinutes: Number(form.durationMinutes), order: Number(form.order), imageFile: selectedFile });
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 px-4" role="dialog" aria-modal="true">
      <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold text-gray-800">{service ? 'تعديل الخدمة' : 'إضافة خدمة'}</h2><button type="button" onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-700" aria-label="إغلاق">×</button></div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-gray-700 sm:col-span-2">اسم الخدمة<input name="name" required value={form.name} onChange={updateField} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
          <label className="text-sm font-medium text-gray-700 sm:col-span-2">الوصف<textarea name="description" value={form.description} onChange={updateField} rows="3" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
          <label className="text-sm font-medium text-gray-700">التصنيف<select name="category" value={form.category} onChange={updateField} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="text-sm font-medium text-gray-700">المدة (دقيقة)<input name="durationMinutes" type="number" min="1" required value={form.durationMinutes} onChange={updateField} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
          <label className="text-sm font-medium text-gray-700">السعر<input name="price" type="number" min="0" value={form.price} onChange={updateField} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="يحدد بعد الفحص" /></label>
          <label className="text-sm font-medium text-gray-700">تسمية السعر<input name="priceLabel" value={form.priceLabel} onChange={updateField} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
          <label className="text-sm font-medium text-gray-700">الترتيب<input name="order" type="number" min="0" value={form.order} onChange={updateField} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 sm:col-span-2"><input name="isActive" type="checkbox" checked={form.isActive} onChange={updateField} className="h-4 w-4 accent-[#0F766E]" />الخدمة متاحة للحجز</label>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">صورة الخدمة</label>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                {previewUrl ? <img src={previewUrl} alt="preview" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-gray-400">لا يوجد</div>}
              </div>
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <p className="mt-1 text-xs text-gray-500">اختياري، ارفع صورة للخدمة (jpg/png).</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3"><button type="submit" disabled={isSaving} className="flex-1 rounded-lg bg-[#0F766E] py-2.5 font-medium text-white hover:bg-[#0d6259] disabled:opacity-60">{isSaving ? 'جاري الحفظ...' : 'حفظ'}</button><button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50">إلغاء</button></div>
      </form>
    </div>
  );
};

export default ServiceFormModal;
