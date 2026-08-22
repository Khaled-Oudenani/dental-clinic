import { useCallback, useEffect, useState } from 'react';
import { getMessages, markMessageAsRead } from '../../api/contact.api';
import ContactMessagesTable from '../../components/admin/ContactMessagesTable';
const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState('');
  const loadMessages = useCallback(async () => { setIsLoading(true); try { const response = await getMessages(); setMessages(response.data); } catch { setError('تعذر تحميل الرسائل'); } finally { setIsLoading(false); } }, []);
  useEffect(() => { loadMessages(); }, [loadMessages]);
  const handleMarkAsRead = async (id) => { try { await markMessageAsRead(id); setMessages((current) => current.map((message) => message._id === id ? { ...message, isRead: true } : message)); } catch (err) { setError(err.response?.data?.message || 'تعذر تحديث الرسالة'); } };
  return <div><div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">الرسائل</h1><p className="mt-1 text-sm text-gray-500">رسائل الزوار الواردة من صفحة التواصل.</p></div>{error && <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}{isLoading ? <p className="text-gray-500">جاري تحميل الرسائل...</p> : <ContactMessagesTable messages={messages} onMarkAsRead={handleMarkAsRead} />}</div>;
};
export default AdminMessagesPage;