import React, { useEffect, useRef, useContext } from 'react';
import Login from '../../Pages/Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { authContext } from '../../Context/AuthContext'; // ⬅️ Adjust path if needed

export default function LoginModal({ onClose }) {
  const modalRef = useRef();
  const { token } = useContext(authContext); // ⬅️ Watch the token

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on outside click
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Auto-close when user logs in
  useEffect(() => {
    if (token) {
      onClose();
    }
  }, [token, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 mt-16"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white p-6 rounded-3xl relative max-w-md w-full"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pt-2">
          <h1 className="text-darkPrimary text-2xl font-bold">
            <FontAwesomeIcon icon={faOpencart} className="text-primary" />
            <span> FreshCart</span>
          </h1>
          <button
            className="cursor-pointer font-bold text-darkPrimary hover:text-red-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <Login />
      </div>
    </div>
  );
}
