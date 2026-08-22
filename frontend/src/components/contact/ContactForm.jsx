import { useState } from 'react';
import { sendContactMessage } from '../../api/contact.api';
import Icon from '../common/Icon';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await sendContactMessage({ name, email, message });
      setFeedback({ type: 'success', text: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err.response?.data?.message || 'تعذر إرسال الرسالة، حاول مرة أخرى',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:col-span-7 bg-white border border-secondary-container rounded-xl p-6 md:p-8 medical-shadow">
      <h2 className="font-display text-2xl font-semibold text-primary mb-6">أرسل لنا رسالة</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-right">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-body text-sm text-on-surface-variant mb-1">
            الاسم الكامل
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white border border-secondary-container rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none px-4 py-3 font-body text-on-surface transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-body text-sm text-on-surface-variant mb-1">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border border-secondary-container rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none px-4 py-3 font-body text-on-surface transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="font-body text-sm text-on-surface-variant mb-1">
            رسالتك
          </label>
          <textarea
            id="message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white border border-secondary-container rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none px-4 py-3 font-body text-on-surface transition-all resize-none"
          />
        </div>

        {feedback && (
          <p
            className={`text-sm rounded-lg px-4 py-3 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-red-50 text-red-600 border border-red-100'
            }`}
          >
            {feedback.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-on-primary font-medium py-4 rounded-full mt-2 hover:opacity-90 transition-opacity flex justify-center items-center gap-2 disabled:opacity-60"
        >
          <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
          {!isSubmitting && <Icon name="send" soft className="text-[20px]" />}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;