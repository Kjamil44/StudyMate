import React from 'react'
import './Modal.css'

type Props = {
  children: React.ReactNode,
  className?: string,
  closeModal?: () => void
}

const Modal: React.FC<Props> = ({children, className, closeModal}) => {

  const classes = 'modal-content ' + className; 

  return (
    <div>
    <div className='backdrop' onClick={(e)=>{
      e.preventDefault(); 
      e.stopPropagation();
      if(closeModal) closeModal();
      }}>
    </div>
    <div className="modal-container">
      <div className={classes} onClick={(e)=>{
        e.preventDefault();
        e.stopPropagation();
        }}>
          { children }
      </div>
    </div>
    </div>
  )
}

export default Modal