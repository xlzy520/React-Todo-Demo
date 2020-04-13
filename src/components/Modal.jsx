import React from 'react';
import './modal.scss'

const Modal = ({title, onCancel, onOk, children, visible}) => {
  if (visible) {
    return (
      <div>
        <div className="v-modal" tabIndex="0" style={{zIndex: 2019}}/>
        <div className="funky-dialog__wrapper" style={{zIndex: 2020}}>
          <div role="dialog" className="funky-dialog" style={{marginTop: '15vh', width: '30%'}}>
            <div className="funky-dialog__header">
              <span className="funky-dialog__title">{title}</span>
              <button type="button" aria-label="Close" className="funky-dialog__headerbtn">
                <i className="funky-dialog__close funky-icon funky-icon-close"/>
              </button>
            </div>
            <div className="funky-dialog__body">
              <span>{children}</span>
            </div>
            <div className="funky-dialog__footer">
          <span className="dialog-footer">
            <button type="button" className="funky-btn" onClick={onCancel}>
              <span>Cancel</span>
            </button>
          <button type="button" className="funky-btn funky-btn-primary" onClick={onOk}>
            <span>Confirm</span>
          </button>
        </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default Modal
