import './Toast.css';

import React, { useEffect } from 'react';

import {
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-icon">
        {toast.type === 'success' ? (
          <CheckCircle size={20} />
        ) : (
          <AlertCircle size={20} />
        )}
      </div>
      <div className="toast-content">
        <p className="toast-message">{toast.msg}</p>
      </div>
      <button 
        className="toast-close"
        onClick={onClose}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;