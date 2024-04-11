import React, { useEffect, useState } from 'react'
import { fetchVideoById, fetchUserById } from '../../FetchfromBackend/index.js'
import { Link } from 'react-router-dom'

function PlaylistFeed({
    videoid=null
}) {
  console.log(videoid);
  const [user, setUser] = useState(null)
  const [video, setvideo] = useState(null)
  const [hovered, sethovered] = useState(false)

  useEffect(() => {
      ;(async()=>{
        const data = await fetchVideoById(videoid)
        setvideo(prev => data)
        if(data){
          const userdata = await fetchUserById(data.owner)
          setUser(prev => userdata)
        }
      })()
  },[])

  
  return (
    <>
    { 
      video &&
      <div className='py-2 pl-1 pr-1 flex h-full w-full flex-row'
        onMouseLeave={() => {
          sethovered(false)
        }}
      >
          <img
            onMouseEnter={() => {
              sethovered(true)
            }}
            className={`rounded-xl ${hovered ? 'hidden' : ''} h-24 w-44 mr-3 overflow-hidden object-cover object-center`}
            src={video.thumbnail} alt="" 
          />
          <Link to={`/videos/${video._id}`}>
            <video 
            onMouseLeave={(e) => {
              sethovered(false)
            }}
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/videos/${video._id}`
            }} 
            autoPlay
            muted
            src={video.videoFile} 
            className={`rounded-xl ${hovered ? '': 'hidden'} h-24 w-44 mr-3 overflow-hidden object-cover object-center opacity-10 hover:opacity-100 transition-all ease-in-out duration-[3s]`}
          ></video>
          </Link>
        <div className='flex flex-col h-full'>
          <h1 className='text-white text-lg font-bold' >{video.title}</h1>
          {
            user && 
            <h1 className='text-gray-300 text-sm' >@{user.username}</h1>
          }
          <h1 className='text-gray-300 text-sm' >{video.views} views </h1>
        </div>
      </div>
    }
    </>
  )
}

export default PlaylistFeed