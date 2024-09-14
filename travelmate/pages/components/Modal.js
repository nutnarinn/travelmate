import React, { useEffect } from "react";

export default function Modal({ show, onClose, children }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";  //  Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "";  //  Enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md relative">
        <button
          className="absolute top-2 right-4 text-gray-600 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
