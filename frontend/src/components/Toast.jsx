import { motion } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg text-white min-w-[280px] max-w-xs ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? <Check size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
          <p className="text-sm font-medium flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="shrink-0 hover:opacity-70">
            <X size={16} />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default Toast;
