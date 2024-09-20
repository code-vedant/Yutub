import React from 'react'
import checkMark from "../assets/checkMark.png"

function UploadedVideo({closeModal}) {
  return (
    <div className='UploadedVideo-main'>
         <p>Video Uploaded</p>
        <img src={checkMark} alt="" />
        <p>successfully</p>
      <button onClick={closeModal}>x</button>

    </div>
  )
}

export default UploadedVideo