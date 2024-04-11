import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CustomVideoPlayer({
  video=null
}) {
  const allVideos = useSelector(state => state.videoReducer.videoData)
  const vidRef = useRef(null)
  const [ishovered, setishovered] = useState(false)
  const [play, setplay] = useState(false)
  const [nextvideoindex, setnextvideoindex] = useState(0)
  const [prevvideoindex, setprevvideoindex] = useState(0)
  const [volume, setvolume] = useState(30)
  const [currentTime, setcurrentTime] = useState(0)
  const [dursec, setdursec] = useState(0)
  const [durmin, setdurmin] = useState(0)
  const [durhours, setdurhours] = useState(0)
  const [currsec, setcurrsec] = useState(0)
  const [currmin, setcurrmin] = useState(0)
  const [currhours, setcurrhours] = useState(0)
  
  useEffect(() => {
    allVideos.map((vid, index) => {
      if(vid._id === video._id){
        if(index+1 === allVideos.length){
          setnextvideoindex(0)
          setprevvideoindex(index-1)
          return
        }else if(index===0){
          setprevvideoindex(allVideos.length-1)
          setnextvideoindex(index+1)
        }else{
          setprevvideoindex(index-1)
          setnextvideoindex(index+1)
        }
      }
    })
 
    setdursec(Math.floor(vidRef.current.duration%60))
    setdurmin(Math.floor((vidRef.current.duration/60)%60))
    setdurhours(Math.floor(vidRef.current.duration/3600))
  })

  return (
    <div className={`h-full w-full relative`}>
      { 
        ishovered &&
        <div 
          onMouseEnter={(e) => setishovered(true)}
          onMouseLeave={(e) => setishovered(false)}
          className='px-1 z-10 w-full items-center justify-between bg-gray-950 bg-opacity-10 ease-in-out bor flex absolute bottom-0'
        >
          <div className='flex items-center'>
            <button
              onClick={(e) => {
                e.preventDefault()
                vidRef.current.play()
                console.log(vidRef.current.currentTime);
                console.log(vidRef.current.duration);
                setplay(true)
              }}
              className={`text-white py-2 px-3 ${play ? 'hidden' : ''}`}
            >
              <span class="material-symbols-outlined">
                play_arrow
              </span>
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault()
                vidRef.current.pause()
                console.log('here');
                console.log(vidRef.current.currentTime.getMinutes());
                console.log(vidRef.current.currentTime.getHours());
                setplay(false)
              }}
              className={`text-white outline-black py-2 px-3 ${play ? '' : 'hidden'}`}
            >
              <span class="material-symbols-outlined">
                pause
              </span>
            </button>

            <Link to={`/videos/${allVideos[prevvideoindex]?._id}`}>
            <button
              className='text-white py-2 px-3'
            >
              <span class="material-symbols-outlined">
                skip_previous
              </span>
            </button>
            </Link>

            <Link to={`/videos/${allVideos[nextvideoindex]?._id}`}>
            <button
              className='text-white py-2 px-3'
            >
              <span class="material-symbols-outlined">
                skip_next
              </span>
            </button>
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault()
                setvolume(0)
                vidRef.current.volume = 0.00
              }}
              className={`text-white py-2 pl-3 pr-2 ${volume == 0 ? 'hidden' : ''}`}
            >
              <span class="material-symbols-outlined">
                volume_up
              </span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setvolume(50)
                vidRef.current.volume = 0.50
              }}
              className={`text-white py-2 pl-3 pr-2 ${volume == 0 ? '' : 'hidden'}`}
            >
              <span class="material-symbols-outlined">
                volume_off
              </span>
            </button>
            <label
              className='text-white py-2 px-3'
            >
              <input 
                className='w-20'
                type="range"
                value={volume}
                onChange={(e) => {
                  setvolume(e.target.value)
                  vidRef.current.volume = 0.01*e.target.value;
                }} 
                min="0" 
                max="100" 
                step={0.01} 
              />
            </label>

            <label
              className='text-white py-2 px-3'
            >
              <input 
              className='text-white bg-transparent w-5'
              value={currentTime}
              readOnly
              type="text" />
              /
              <label>
                {durhours!=0 ? `${ durhours<10 ? `0${durhours}:` : `${durhours}:`}` : ``} {durmin<10 ? `0${durmin}` : durmin}:{dursec<10 ? `0${dursec}` : dursec}
              </label>
            </label>
          </div>

          <div className='flex items-center'>
            <button
              className='text-white py-2 px-3'
            >
              <span class="material-symbols-outlined">
                autoplay
              </span>
            </button>
            
            <button
              className='text-white py-2 px-3'
            >
              <span class="material-symbols-outlined">
                settings
              </span>
            </button>

            {/* {
              !fullscreen && */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  vidRef.current.requestFullscreen()
                  // setfullscreen(true)
                }}
                className='text-white py-2 px-3'
              >
                <span class="material-symbols-outlined">
                  fullscreen
                </span>
              </button>
            {/* }  */}

            {/* { 
              fullscreen && 
              <button
                onClick={(e) => {
                  e.preventDefault()
                  vidRef.current.exitFullscreen()
                  setfullscreen(false)
                }}
                className='text-white py-2 px-3'
              >
                <span class="material-symbols-outlined">
                  fullscreen_exit
                </span>
              </button>
            } */}
            
          </div>
          
        </div>
      }  
      <video 
        onPlay={(e) => {
          setcurrentTime(vidRef.current.currentTime)
        }}
        ref={vidRef}
        onMouseEnter={() => setishovered(true)}
        onMouseLeave={() => setishovered(false)}
        src={video.videoFile} 
        className={`${ishovered ? '' : 'rounded-2xl'}  w-full h-full overflow-hidden object-cover object-center`}
      />
    </div>
  )
}

export default CustomVideoPlayer