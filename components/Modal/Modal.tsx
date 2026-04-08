"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  setMounted(true); 
  
  document.body.style.overflow = "hidden";
    
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.setAttribute('id', 'modal-root');
      document.body.appendChild(root);
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};