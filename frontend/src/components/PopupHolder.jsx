import React from 'react'
import "../style/popupHolder.css"

function PopupHolder({children ,closeModal}) {
  return (
    <div className='PopupHolder'>
        {children}
    </div>
  )
}

export default PopupHolder