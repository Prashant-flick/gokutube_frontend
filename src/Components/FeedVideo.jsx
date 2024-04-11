import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function FeedVideo({
    video=null,
    myvideo=false
}) {
  const status = useSelector(state => state.authReducer.status)
  const [showVideo, setShowVideo] = useState(false)
  const [showvideosettingicon, setshowvideosettingicon] = useState(false)
  const [showvideosetting, setshowvideosetting] = useState(false)

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

  return (
    <div
      className='h-full w-full p-4'
      onMouseEnter={() => {
        setshowvideosettingicon(prev => true)
      }}
      onMouseLeave={() => {
        setshowvideosettingicon(prev => false)
        setShowVideo(false)
      }}
    >
      <Link to={`/videos/${video._id}`}>
        <video 
          onMouseLeave={() => {
            setShowVideo(false)
          }}
          controls
          autoPlay
          muted
          className={`w-full ${showVideo ? '' : 'hidden'} ${myvideo? 'h-52 ' : 'h-60'} opacity-10 hover:opacity-100 transition-all ease-in-out duration-[3s] rounded-lg mb-2 border border-gray-700 overflow-hidden object-cover object-center`}>
          <source src={video.videoFile} type='video/mp4'/>
        </video>

        <img
          onMouseEnter={()=>{
            setShowVideo(true)  
          }}
          src={video.thumbnail} alt="Video Thumbnail"
            className={`rounded-lg mb-2 transition-opacity duration-500 ease-in-out ${showVideo ? 'hidden': ''}  ${myvideo? 'h-52' : 'h-60'} w-full overflow-hidden object-cover object-center`}
        />
      </Link>
  
        <div 
          className='ml-3 gap-2 flex flex-row mb-3 items-center relative'
          onMouseLeave={()=> {
            setShowVideoOptions(false)
          }}
        >
          
          <Link to={`${status ? `/channel/${null}?id=${video.owner}` : '/login'}`}>
            <img src={video.owneravatar} alt="User Profile"
            className='rounded-full h-10 w-10'
            />
          </Link>
  
          <div className='flex flex-col'>
          <h1 className='text-white text-xl'>{video.title}</h1>
          <h2 className='text-gray-500'>{video.views} views - {CalcTimeFromNow()}</h2>
          </div>
          <button className={`text-white absolute right-1 ${!showvideosettingicon && 'hidden'}`}>:</button>
        </div>
    
       
    </div>
  )
}

export default FeedVideo