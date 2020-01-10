import React from 'react';
import './Modal.css'

const Modal = ({isOpen, embedUrl}) => (
    <>
        <div onClick={isOpen} className="modal-backdrop"></div>
        <div className="modal-container">
            <button onClick={isOpen} type="button">×</button>
            <iframe title="slide video" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowFullScreen="" src={embedUrl}></iframe>
        </div>
    </>
);

export default Modal;