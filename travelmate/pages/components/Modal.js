import React from 'react';

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md relative">
        <button className="absolute top-2 right-4 text-gray-600 text-2xl" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
