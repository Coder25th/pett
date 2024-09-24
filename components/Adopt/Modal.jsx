// Modal.js
'use client'
import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const handleOutsideClick = (event) => {
    if (event.target.id === 'modal-overlay') {
      onClose();
    }
  };

  useEffect(() => {
    // Close modal on Escape key press
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-gray-900 rounded-lg p-6 max-w-3xl w-full relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
