import React from "react";
import "./../assets/styles/Modal.scss";
import { Trans } from 'react-i18next';

export default function Modal(props) {
  const { isOpen } = props;

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              {props.children}
              <button className="close-button" onClick={props.onClose}>
                <Trans i18nKey="CloseModal" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
