import React, { useRef, useState } from 'react'
import "../style/dashboard.css";
import { useForm } from 'react-hook-form';
import upload from "../assets/upload.png";
import VideoService from '../Service/video';
import PopupHolder from './PopupHolder';
import Loader from './Loader';

function VideoEditModal({closeEditModal,accessToken,videoId}) {

    

    const {register, handleSubmit} = useForm()
    const [thumnail, setThumnail] = useState(null);
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setThumnail(event.target.files[0]);
      };
    const handleInputChange = ()=> {
        inputRef.current.click();
    }

    const editVideo =async (data)=> {
        setLoading(true);
        const formData = new FormData();
        formData.append("thumbnail", thumnail);
        formData.append("title",data.title );
        formData.append("description",data.description)

        try {
            await VideoService.updateVideo(accessToken,videoId,formData)
            alert("Video updated successfully");
            closeEditModal()
        } catch (error) {
            console.log(error.message);
            
        }finally{
            setLoading(false);
        }

    }

  return (
    <>
    {loading && <PopupHolder>
                <Loader />
        </PopupHolder>}
    <div className="V-edit-main">
        <h1>Edit Video</h1>
        <form onSubmit={handleSubmit(editVideo)}>
            <div className="V-edit-thumbnail">
                <div className="V-edit-thumbnail-holder">
                {thumnail ? (
              <img
                src={URL.createObjectURL(thumnail)}
                onClick={handleInputChange}
                className="V-edit-imgAchieved"
              />
            ) : (
              <img
                src={upload}
                onClick={handleInputChange}
                alt="upload Cover"
              />
            )}
                <input type="file" ref={inputRef}
          onChange={handleChange}
          className="V-edit-files"
          accept="image/*" />
                </div>
          <textarea type="text" placeholder="Title" {...register("title")}/>
            </div>
        <div className="V-edit-form">
          <textarea type="text" placeholder="Description" {...register("description")} />
          <div className="V-edit-btn">
          <button onClick={closeEditModal}>Cancel</button>
          <button className='V-edit-btn-submit' type='submit'>Save Changes</button>
        </div>
        </div>
        
        </form>
    </div>
    </>
  )
}

export default VideoEditModal