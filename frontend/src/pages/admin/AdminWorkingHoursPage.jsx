import { useCallback, useEffect, useState } from 'react';
import { getWorkingHours, updateWorkingHours } from '../../api/workingHours.api';
import WorkingHoursEditor from '../../components/admin/WorkingHoursEditor';
const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const defaultHours = Array.from({ length: 7 }, (_, dayOfWeek) => ({ dayOfWeek, isOpen: true, openTime: '09:00', closeTime: '20:00' }));
const AdminWorkingHoursPage = () => {
  const [hours, setHours] = useState(defaultHours); const [isLoading, setIsLoading] = useState(true); const [savingDay, setSavingDay] = useState(null); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const loadHours = useCallback(async () => { setIsLoading(true); try { const response = await getWorkingHours(); setHours(defaultHours.map((day) => response.data.find((item) => item.dayOfWeek === day.dayOfWeek) || day)); } catch { setError('تعذر تحميل أوقات العمل'); } finally { setIsLoading(false); } }, []);
  useEffect(() => { loadHours(); }, [loadHours]);
  const changeDay = (dayOfWeek, changes) => setHours((current) => current.map((day) => day.dayOfWeek === dayOfWeek ? { ...day, ...changes } : day));
  const saveDay = async (day) => { setSavingDay(day.dayOfWeek); setError(''); try { await updateWorkingHours(day.dayOfWeek, { isOpen: day.isOpen, openTime: day.openTime, closeTime: day.closeTime }); setNotice(`تم حفظ أوقات يوم ${dayNames[day.dayOfWeek]}`); } catch (err) { setError(err.response?.data?.message || 'تعذر حفظ أوقات العمل'); } finally { setSavingDay(null); } };
  return <div><div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">أوقات العمل</h1><p className="mt-1 text-sm text-gray-500">حدد أوقات استقبال الحجوزات لكل يوم.</p></div>{error && <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}{notice && <p className="mb-4 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}{isLoading ? <p className="text-gray-500">جاري تحميل أوقات العمل...</p> : <WorkingHoursEditor hours={hours} savingDay={savingDay} onChange={changeDay} onSave={saveDay} />}</div>;
};
export default AdminWorkingHoursPage;