// @ts-nocheck
import React, { useEffect } from 'react';

interface ErrorToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose, duration = 5000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div 
            className="error-toast"
            style={{
                position: 'fixed',
                bottom: 'max(20px, env(safe-area-inset-bottom))',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(220, 38, 38, 0.95)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 10000,
                fontSize: '14px',
                fontWeight: '500',
                maxWidth: 'calc(100% - 40px)',
                width: 'max-content',
                minWidth: '200px',
                textAlign: 'center',
                animation: 'slideUp 0.3s ease-out',
                cursor: 'pointer',
                wordWrap: 'break-word',
            }}
            onClick={onClose}
        >
            {message}
        </div>
    );
};

