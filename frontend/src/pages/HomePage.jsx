import React, { useEffect } from 'react';
import VideoContainer from '../components/VideoContainer.jsx';
import "../style/homepage.css"
const HomePage = () => {
  const videos = [
    { id: 1, title: 'Video 1', thumbnail: 'https://images.unsplash.com/photo-1716237442748-795f6343ad94?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, title: 'Video 2', thumbnail: 'https://images.unsplash.com/photo-1684283245069-2913795d7989?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D' },
    { id: 3, title: 'Video 3', thumbnail: 'https://images.unsplash.com/photo-1675205199255-b54799d7c3cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, title: 'Video 4', thumbnail: 'https://images.unsplash.com/photo-1690381513681-dd95eb359065?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D' },
    { id: 5, title: 'Video 5', thumbnail: 'https://images.unsplash.com/photo-1659293554631-d7a38642c5e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D' },
    { id: 6, title: 'Video 6', thumbnail: 'https://images.unsplash.com/photo-1514626585111-9aa86183ac98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2V8ZW58MHx8MHx8fDA%3D' },
    { id: 7, title: 'Video 7', thumbnail: 'https://images.unsplash.com/photo-1719425061819-8b9e20db67ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' },
    { id: 8, title: 'Video 8', thumbnail: 'https://images.unsplash.com/photo-1675205199255-b54799d7c3cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 9, title: 'Video 9', thumbnail: 'https://plus.unsplash.com/premium_photo-1720884610406-a1f4f61c8853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' },
    //...
  ];

  return (
    <div className="youtube-homepage">
      {videos.map((video) => (
        <div key={video.id} className="vidcont">
          <VideoContainer key={video.id} video={video} />
        </div> 
      ))}
    </div>
  );
};

export default HomePage;