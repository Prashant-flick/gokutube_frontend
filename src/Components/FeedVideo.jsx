import React,{useEffect, useState} from 'react'
import { fetchUserById } from '../FetchfromBackend/index.js';
import { Link } from 'react-router-dom';

function FeedVideo({
    video=null,
    myvideo=false
}) {
  const [avatar, setavatar] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = (e) => {
    e.preventDefault();
    setShowVideo((prev) => !prev);
  }

  useEffect(() => {
    ;(async() => {
      const data = await fetchUserById(video.owner);
      setavatar(data.avatar)
    })()
  },[]);

  return (
    <div>
        {
          showVideo ?
          <video onMouseLeave={(e) => toggleVideo(e)} controls autoPlay className={`w-full ${showVideo ? 'opacity-100 transition-opacity duration:500 ease-in-out': 'opacity-0'} ${myvideo? 'h-56' : 'h-64'} rounded-lg mb-2 border border-gray-700 overflow-hidden object-cover object-center`}>
            <source src={video.videoFile} type='video/mp4'/>
          </video>
          :
          <img onmouse onMouseEnter={(e) => toggleVideo(e)} src={video.thumbnail} alt="Video Thumbnail"
              className={`rounded-lg mb-2 transition-opacity duration-500 ease-in-out ${!showVideo ? 'opacity-100': 'opacity-0'}  ${myvideo? 'h-56' : 'h-64'} w-full overflow-hidden object-cover object-center`}
          />
        }
  
        <div className='ml-3 gap-2 flex flex-row mb-3 items-center'> 
          {
            myvideo ? <></>
            :
            <Link to={`/channel/${null}?id=${video.owner}`}>
              <img src={avatar} alt="User Profile"
              className='rounded-full h-10 w-10'
              />
            </Link>
          }
           
          <div className='flex flex-col'>
          <h1 className='text-white text-xl'>{video.title}</h1>
          <h2 className='text-gray-500'>{video.description}</h2>
          </div>
        </div>
    
       
    </div>
  )
}

export default FeedVideo