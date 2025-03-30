import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastItem = styled.div`
  min-width: 300px;
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme, type }) => {
    switch (type) {
      case 'success': return theme.success || '#28a745';
      case 'error': return theme.error || '#dc3545';
      case 'warning': return theme.warning || '#ffc107';
      default: return theme.info || '#17a2b8';
    }
  }};
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${({ isExiting }) => isExiting ? slideOut : slideIn} 0.3s ease;

  .icon {
    font-size: 20px;
  }

  .content {
    flex: 1;
  }

  .close {
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

const getIcon = (type) => {
  switch (type) {
    case 'success': return '✓';
    case 'error': return '✕';
    case 'warning': return '⚠';
    default: return 'ℹ';
  }
};

const Toast = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastItem type={type}>
      <span className="icon">{getIcon(type)}</span>
      <span className="content">{message}</span>
      <span className="close" onClick={onClose}>✕</span>
    </ToastItem>
  );
};

const ToastManager = ({ toasts, removeToast }) => {
  return (
    <ToastContainer>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContainer>
  );
};

export default ToastManager;
