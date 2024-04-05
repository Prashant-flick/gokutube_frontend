import React,{useEffect, useState} from 'react'
import { fetchUserById } from '../FetchfromBackend/index.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FeedVideo({
    video=null,
    myvideo=false
}) {
  const [avatar, setavatar] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showVideoOptions, setShowVideoOptions] = useState(false);

  const toggleVideo = (e) => {
    e.preventDefault();
    setShowVideo((prev) => !prev);
  }

  const deleteVideo = async(e) => {
      e.preventDefault();
      console.log('here');
      const data = await axios.delete(`/api/v1/videos/delete-video/${video._id}`);
      if(data.status === 200){
        window.location.reload();
      }
  }

  const CalcTimeFromNow = () => {
    let date  = new Date()
    let date2 = date.toString().split(' ')  
    let videoTime = new Date(video.createdAt)
    let videoTime2 = videoTime.toString().split(' ')

    if(date2[3] - videoTime2[3] > 0){
      if(date2[3] - videoTime2[3] === 1){
        return '1 year ago'
      }
      return `${date2[3] - videoTime2[3]} years ago`
    }
    if(date.getMonth() - videoTime.getMonth() > 0){
      if(date.getMonth() - videoTime.getMonth() === 1){
        return '1 month ago'
      }
      return `${date.getMonth() - videoTime.getMonth()} months ago`
    }
    if(date2[2] - videoTime2[2] > 0){
      if(date2[2] - videoTime2[2] === 1){
        return '1 day ago'
      }
      return `${date2[2] - videoTime2[2]} days ago`
    }
    if(date2[4].split(':')[0] - videoTime2[4].split(':')[0] > 0){
      if(date2[4].split(':')[0] - videoTime2[4].split(':')[0] === 1){
        return 'an hour ago'
      }
      return `${date2[4].split(':')[0] - videoTime2[4].split(':')[0]} hours ago`
    }
    if(date2[4].split(':')[1] - videoTime2[4].split(':')[1] > 0){
      if(date2[4].split(':')[1] - videoTime2[4].split(':')[1] === 1){
        return 'a minute ago'
      }
      return `${date2[4].split(':')[1] - videoTime2[4].split(':')[1]} minutes ago`
    }
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
          <video onMouseLeave={(e) => toggleVideo(e)} controls className={`w-full ${showVideo ? 'opacity-100 transition-opacity duration:500 ease-in-out': 'opacity-0'} ${myvideo? 'h-52 ' : 'h-60'} rounded-lg mb-2 border border-gray-700 overflow-hidden object-cover object-center`}>
            <source src={video.videoFile} type='video/mp4'/>
            <img onmouse onMouseEnter={(e) => toggleVideo(e)} src={video.thumbnail} alt="Video Thumbnail"
              className={`rounded-lg mb-2 transition-opacity duration-500 ease-in-out ${!showVideo ? 'opacity-100': 'opacity-0'}  ${myvideo? 'h-52' : 'h-60'} w-full overflow-hidden object-cover object-center`}
          />
          </video>
          :
          <img onmouse onMouseEnter={(e) => toggleVideo(e)} src={video.thumbnail} alt="Video Thumbnail"
              className={`rounded-lg mb-2 transition-opacity duration-500 ease-in-out ${!showVideo ? 'opacity-100': 'opacity-0'}  ${myvideo? 'h-52' : 'h-60'} w-full overflow-hidden object-cover object-center`}
          />
        }
  
        <div 
          className='ml-3 gap-2 flex flex-row mb-3 items-center relative'
          onMouseLeave={(e) => setShowVideoOptions((prev) => false)}
        > 
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
          <h2 className='text-gray-500'>{video.description} - {CalcTimeFromNow()}</h2>
          </div>
          {
            myvideo &&
            <>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  setShowVideoOptions((prev) => true)
                }}
                className='text-white absolute right-1 px-2'
              >
                :
              </button>
              {
                showVideoOptions && 
                <div className='absolute flex flex-col text-sm text-white right-5 bg-gray-700 px-3 py-1 rounded-2xl'>
                  <button className='w-full border-b hover:text-gray-400'>Edit</button>
                  <button onClick={(e) => deleteVideo(e)} className='hover:text-gray-400'>Delete</button>
                </div>
              }
            </>
            
          }
        </div>
    
       
    </div>
  )
}

export default FeedVideo