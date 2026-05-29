import React, { useEffect, useState } from 'react';

import {
  notifications$,
  Notification,
} from '@microfrontend-ecommerce/shared';

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Notification[]>([]);

  useEffect(() => {
    console.log('ToastContainer subscribed');

    const subscription = notifications$.subscribe(
      (notification: Notification) => {
        console.log('TOAST RECEIVED:', notification);

        setToasts((prev) => [...prev, notification]);

        setTimeout(() => {
          setToasts((prev) =>
            prev.filter((t) => t.id !== notification.id)
          );
        }, notification.duration || 3000);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            color: '#fff',
            minWidth: '250px',
            fontWeight: 600,
            background:
              toast.type === 'success'
                ? '#22c55e'
                : toast.type === 'error'
                ? '#ef4444'
                : toast.type === 'warning'
                ? '#f59e0b'
                : '#3b82f6',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;