const statusLabels = { pending: 'قيد الانتظار', confirmed: 'مؤكد', cancelled: 'ملغى', completed: 'مكتمل' };
const statusColors = { pending: 'bg-amber-50 text-amber-700', confirmed: 'bg-blue-50 text-blue-700', cancelled: 'bg-red-50 text-red-700', completed: 'bg-emerald-50 text-emerald-700' };
const formatDate = (date) => new Intl.DateTimeFormat('ar-DZ', { dateStyle: 'medium' }).format(new Date(date));

const AppointmentsTable = ({ appointments, onStatusChange, onDelete }) => (
  <div className="overflow-x-auto rounded-2xl border border-[#E0F2F1] bg-white">
    <table className="w-full min-w-[900px] text-right text-sm">
      <thead className="border-b border-[#E0F2F1] bg-[#F4FBFA] text-gray-600"><tr><th className="px-4 py-3 font-medium">المريض</th><th className="px-4 py-3 font-medium">الخدمة</th><th className="px-4 py-3 font-medium">التاريخ</th><th className="px-4 py-3 font-medium">الوقت</th><th className="px-4 py-3 font-medium">الهاتف</th><th className="px-4 py-3 font-medium">الحالة</th><th className="px-4 py-3 font-medium">إجراءات</th></tr></thead>
      <tbody className="divide-y divide-[#E0F2F1]">{appointments.map((appointment) => <tr key={appointment._id} className="text-gray-700">
        <td className="px-4 py-4"><p className="font-semibold">{appointment.patientName}</p>{appointment.notes && <p className="mt-1 max-w-[160px] truncate text-xs text-gray-500">{appointment.notes}</p>}</td><td className="px-4 py-4">{appointment.service?.name || 'غير متاحة'}</td><td className="px-4 py-4">{formatDate(appointment.date)}</td><td className="px-4 py-4">{appointment.timeSlot}</td><td className="px-4 py-4" dir="ltr">{appointment.phone}</td>
        <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs ${statusColors[appointment.status]}`}>{statusLabels[appointment.status]}</span></td><td className="px-4 py-4"><div className="flex items-center gap-2"><select value={appointment.status} onChange={(event) => onStatusChange(appointment._id, event.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs"><option value="pending">قيد الانتظار</option><option value="confirmed">مؤكد</option><option value="completed">مكتمل</option><option value="cancelled">ملغى</option></select><button onClick={() => onDelete(appointment)} className="text-red-600 hover:underline">حذف</button></div></td>
      </tr>)}</tbody>
    </table>
    {!appointments.length && <p className="p-8 text-center text-gray-500">لا توجد حجوزات مطابقة.</p>}
  </div>
);
export default AppointmentsTable;