import { useCallback, useEffect, useState } from 'react';
import { getClinicInfo, updateClinicInfo } from '../../api/clinicInfo.api';
import ClinicInfoForm from '../../components/admin/ClinicInfoForm';
const AdminClinicInfoPage = () => {
  const [info, setInfo] = useState(null); const [isLoading, setIsLoading] = useState(true); const [isSaving, setIsSaving] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const loadInfo = useCallback(async () => { setIsLoading(true); try { const response = await getClinicInfo(); setInfo(response.data); } catch { setError('تعذر تحميل معلومات العيادة'); } finally { setIsLoading(false); } }, []);
  useEffect(() => { loadInfo(); }, [loadInfo]); const handleSubmit = async (payload) => { setIsSaving(true); setError(''); try { const response = await updateClinicInfo(payload); setInfo(response.data); setNotice('تم حفظ معلومات العيادة بنجاح'); } catch (err) { setError(err.response?.data?.message || 'تعذر حفظ معلومات العيادة'); } finally { setIsSaving(false); } };
  return <div><div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">معلومات العيادة</h1><p className="mt-1 text-sm text-gray-500">حدّث بيانات التواصل الظاهرة للزوار.</p></div>{error && <p className="mb-4 max-w-3xl rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}{notice && <p className="mb-4 max-w-3xl rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}{isLoading ? <p className="text-gray-500">جاري تحميل المعلومات...</p> : <ClinicInfoForm info={info} isSaving={isSaving} onSubmit={handleSubmit} />}</div>;
};
export default AdminClinicInfoPage;