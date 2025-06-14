import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import VideoService from '../../Service/video'
import VideoContainer from '../VideoContainer'

export default function VideoPage() {

  const [video,setVideo] = useState([])
  const [error,setError] = useState("")
  const accessToken = useSelector(state=>state.auth.accessToken)

  const getVideos = async () => {
    setError("")
    try {
      const res = await VideoService.getAllVideos()
      setVideo(res.data.docs)

    } catch (error) {
      setError(error.response.data.message)
    }
  }

  useEffect(()=>{
    getVideos()
  },[])


  return (
    <section className='videopage-main'>
      {error && <p>{error}</p>}
      {video.map((vid)=> 
      <VideoContainer video={vid} />
      )}
    </section>
  )
}
