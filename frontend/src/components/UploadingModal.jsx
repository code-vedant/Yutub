import React from 'react'
import "../style/uploaders.css"

function UploadingModal() {
  return (
    <div className='UploadingModal-main'>
        <h1>Uploading Video</h1>
        <div className="loaderVideo"></div>
      <p>Please wait while your video is being uploaded.</p>
    </div>
  )
}

export default UploadingModal