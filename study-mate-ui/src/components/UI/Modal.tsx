import React from 'react'
import './Modal.css'

type Props = {
  children: React.ReactNode,
  className?: string
}

const Modal: React.FC<Props> = ({children, className}) => {

  const classes = 'modal-content ' + className; 

  return (
    <div className='backdrop'>
        <div className={classes}>
          { children }
        </div>
    </div>

  )
}

export default Modal