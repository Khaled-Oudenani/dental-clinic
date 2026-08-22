import { useEffect, useState } from 'react';
import { getAppointments } from '../../api/appointments.api';
import { getMessages } from '../../api/contact.api';

const todayISO = () => new Date().toISOString().split('T')[0];

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [todayRes, pendingRes, messagesRes] = await Promise.all([
          getAppointments({ date: todayISO() }),
          getAppointments({ status: 'pending' }),
          getMessages(),
        ]);

        setStats({
          todayCount: todayRes.count,
          pendingCount: pendingRes.count,
          unreadMessagesCount: messagesRes.data.filter((m) => !m.isRead).length,
        });
      } catch (err) {
        setError('تعذر تحميل البيانات، حاول تحديث الصفحة');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) return <p className="text-gray-500">جاري التحميل...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const cards = [
    { label: 'حجوزات اليوم', value: stats.todayCount, color: 'bg-[#0F766E]' },
    { label: 'حجوزات قيد الانتظار', value: stats.pendingCount, color: 'bg-amber-500' },
    { label: 'رسائل غير مقروءة', value: stats.unreadMessagesCount, color: 'bg-rose-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">نظرة عامة</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-[#E0F2F1] p-5">
            <span className={`inline-block w-2 h-2 rounded-full ${card.color} mb-3`} />
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;