import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { fetchUserById } from '../../FetchfromBackend/index.js'

function FeedSingleVideo({
    video=null
}) {
  const [user, setUser] = useState(null)
  const [hovered, sethovered] = useState(false)

  useEffect(() => {
    ;(async()=>{
      if(video){
        const data = await fetchUserById(video.owner)
        setUser((prev) => prev=data)
      }
    })()
  },[video])

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
        <img
          onMouseEnter={(e) => {
            e.preventDefault()
            sethovered((prev) => prev=true)
          }}
          className={`rounded-xl ${hovered ? 'hidden' : ''} h-24 w-44 mr-3 overflow-hidden object-cover object-center`}
          src={video.thumbnail} alt="" 
        />
        <Link to={`/videos/${video._id}`}>
          <video 
          onMouseLeave={(e) => {
            e.preventDefault()
            sethovered((prev) => prev=false)
          }}
          onClick={(e) => {
            e.preventDefault()
            window.location.href = `/videos/${video._id}`
          }} 
          autoPlay
          muted
          src={video.videoFile} 
          className={`rounded-xl ${hovered ? '': 'hidden'} h-24 w-44 mr-3 overflow-hidden object-cover object-center`}
        ></video>
        </Link>
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

export default FeedSingleVideo
