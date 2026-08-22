const ServicesTable = ({ services, onEdit, onDelete, onToggle }) => (
  <div className="overflow-x-auto rounded-2xl border border-[#E0F2F1] bg-white">
    <table className="w-full min-w-[720px] text-right text-sm">
      <thead className="border-b border-[#E0F2F1] bg-[#F4FBFA] text-gray-600">
        <tr>
          <th className="px-4 py-3 font-medium">&nbsp;</th>
          <th className="px-4 py-3 font-medium">الخدمة</th>
          <th className="px-4 py-3 font-medium">التصنيف</th>
          <th className="px-4 py-3 font-medium">السعر</th>
          <th className="px-4 py-3 font-medium">المدة</th>
          <th className="px-4 py-3 font-medium">الحالة</th>
          <th className="px-4 py-3 font-medium">إجراءات</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#E0F2F1]">
        {services.map((service) => (
          <tr key={service._id} className="text-gray-700">
            <td className="px-4 py-4">
              <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                {service.imageUrl ? (
                  <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">صورة</div>
                )}
              </div>
            </td>
            <td className="px-4 py-4"><p className="font-semibold">{service.name}</p><p className="mt-1 max-w-xs truncate text-xs text-gray-500">{service.description || 'بدون وصف'}</p></td>
            <td className="px-4 py-4">{service.category}</td>
            <td className="px-4 py-4">{service.price == null ? 'يحدد بعد الفحص' : `${service.price} دج`}</td>
            <td className="px-4 py-4">{service.durationMinutes} د</td>
            <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs ${service.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{service.isActive ? 'نشطة' : 'معطلة'}</span></td>
            <td className="px-4 py-4"><div className="flex gap-2"><button onClick={() => onEdit(service)} className="text-[#0F766E] hover:underline">تعديل</button><button onClick={() => onToggle(service)} className="text-amber-600 hover:underline">{service.isActive ? 'تعطيل' : 'تفعيل'}</button><button onClick={() => onDelete(service)} className="text-red-600 hover:underline">حذف</button></div></td>
          </tr>
        ))}
      </tbody>
    </table>
    {!services.length && <p className="p-8 text-center text-gray-500">لا توجد خدمات مضافة بعد.</p>}
  </div>
);

export default ServicesTable;
