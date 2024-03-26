import React,{useState, useEffect} from 'react'
import { fetchUserById } from '../../FetchfromBackend/index.js'

function VideoPageFeedVideo({
  video=null
}) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    ;(async()=>{
      if(video){
        const data = await fetchUserById(video.owner)
        setUser((prev) => prev=data)
      }
    })()
  })

  const CalcTimeFromNow = () => {
    let date  = new Date()
    let date2 = date.toString().split(' ')
    let videoTime = new Date(video.createdAt)
    let videoTime2 = videoTime.toString().split(' ')

    if(date2[3] - videoTime2[3] > 0){
      return `${date2[3] - videoTime2[3]} years ago`
    }
    if(date.getMonth() - videoTime.getMonth() > 0){
      return `${date.getMonth() - videoTime.getMonth()} months ago`
    }
    if(date2[2] - videoTime2[2] > 0){
      return `${date2[2] - videoTime2[2]} days ago`
    }
    if(date2[4].split(':')[0] - videoTime2[4].split(':')[0] > 0){
      return `${date2[4].split(':')[0] - videoTime2[4].split(':')[0]} hours ago`
    }
    if(date2[4].split(':')[1] - videoTime2[4].split(':')[1] > 0){
      return `${date2[4].split(':')[1] - videoTime2[4].split(':')[1]} minutes ago`
    }
  }

  return (
    <>
      <video src={video.videoFile} className='rounded-xl h-24 w-44 mr-3 overflow-hidden object-cover object-center'></video>
      <div className='flex flex-col h-full'>
        <h1 className='text-white text-lg font-bold' >{video.title}</h1>
        {
          user && 
          <h1 className='text-gray-300 text-sm' >@{user.username}</h1>
        }
        <h1 className='text-gray-300 text-sm' >{video.views} views . {CalcTimeFromNow()} </h1>
      </div>
    </>
  )
}

export default VideoPageFeedVideo
