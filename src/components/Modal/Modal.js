import React from 'react';
import '../styles.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');


export default function Modal({src, onClose}) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [onClose]);
   

 const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }}

    return createPortal(
      <div className="Overlay" onClick={handleOverlay}>
        <div className="Modal">
          <img src={src} alt="зображення" />
        </div>
      </div>,
      modalRoot
    );
  };



Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
