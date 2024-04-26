import React, { useEffect, useState } from 'react'
import { fetchUserVideo} from '../../FetchfromBackend'
import { useParams } from 'react-router-dom'
import { Input, Button, MyvideosFeed } from '../index.js'
import { setdata as setvideodata, adddata as addvideodata} from '../../store/videoSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../api/axios.js'
import { ThreeDots } from 'react-loader-spinner'

function MyVideos() {
  const videodata = useSelector(state => state.videoReducer.videoData)
  const videolen = useSelector(state => state.videoReducer.length)
  const [showUploadSection, setShowUploadSection] = useState(false)
  const {id} = useParams()
  const dispatch = useDispatch()
  const [length, setlength] = useState(0)
  const currentUser  = useSelector(state => state.authReducer.userData)

  //form data
  const [title, settitle] = useState(null)
  const [description, setdescription] = useState(null)
  const [videoFile, setvideoFile] = useState(null)
  const [thumbnail, setthumbnail] = useState(null)

  useEffect(() => {
    if(id){
      ;(async () => {
        const data = await fetchUserVideo(id)
        if(data){
          // setVideos(data.videos)
          setlength(data.length)
          dispatch(setvideodata(data))
        }
      })()
    }
    else{
      setlength(videolen)
    }

  },[])

  //Upload Video
  const uploadFile = async (type) => {
    const data = new FormData()
    data.append("file", type === 'video' ? videoFile : thumbnail)
    data.append("upload_preset", type === 'video' ? "videos_preset" : "images_preset")

    try {
      let cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      let resourceType = 'auto'
      let url = `https://api.cloudinary.com/v1_1/${cloudname}/${resourceType}/upload`

      let secure_url = ''
      await fetch(url, {
        method: "POST",
        body: data
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          secure_url = data.secure_url
        })
      return secure_url
    } catch (error) {
      console.error(error);
    }
  }

  const uploadVideo = async (e) => {
    
    try {
      setloading(true)
      let flag1 = true

      if(thumbnail && videoFile && title && description){
        flag1=false
        const url1 = await uploadFile('thumbnail')
        const url2 = await uploadFile('video')

        console.log(url1, url2);
        if(url1 && url2){
          const data = await axios.patch(`/api/v1/videos/publish-video`, {
            title,
            description,
            thumbnail: url1,
            videoFile: url2
          })
          if(data.status === 200){
            flag1 = true
          }
        }
      }

      if(flag1){
        settitle(null)
        setdescription(null)
        setthumbnail(null)
        setvideoFile(null)

        console.log('file uploaded successfully');
        setloading(false)
        window.location.reload()
      }

      
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <>
      <div className='flex justify-center mb-4'>
        {
          showUploadSection ? 
          <div onClick={(e)=>setShowUploadSection(prev=> prev=!prev)} className='top-0 z-20 left-0 flex items-center justify-center bg-white bg-opacity-20 fixed w-full h-full'>
            <form 
              onSubmit={(e)=>uploadVideo(e)} 
              className='bg-gray-500 flex flex-col relative z-20 rounded-3xl pt-4 items-center gap-2 w-[25%] h-[55%] '
              onClick={(e) => e.stopPropagation()}  
            >
              <h1 className='text-3xl font-bold mb-1'>Input</h1>
              <Input 
                className="w-[70%]" 
                label='Title' 
                type='text'
                value={title}
                onChange={(e) => settitle((prev) => e.target.value)}
              />
              <Input 
                className="w-[70%]" 
                label='Description' 
                type='text' 
                value={description}
                onChange={(e) => setdescription((prev) => e.target.value)}
              />
              <Input 
                label='VideoFile' 
                type='file' 
                onChange={(e) => setvideoFile((prev) => e.target.files[0])}
              />
              <Input 
                label='Thumbnail'   
                type='file' 
                onChange={(e) => setthumbnail((prev) => e.target.files[0])}
              />
              <Button label='Upload'/>
              { loading &&
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              }
            </form>
          </div>
          :
          <></>
        }
        {
          currentUser?._id === id &&
            <Button onClick={(e)=>setShowUploadSection(prev=> prev=!prev)} label='Upload Video' classname='ml-3 mb-0 mt-1 rounded-3xl'/>
        }
      </div>
    {
      videodata?.length ?
      <div className={`${videodata?.length ? 'grid grid-cols-3 px-5 h-full' : 'flex justify-center items-center h-[29vh]'}`}>
        {
          videodata?.length>0 && videodata.map((video, index) => {
            return (
              <div
                key={index}
                className='flex flex-col rounded-lg mt-1 w-full h-full'
              >
                <MyvideosFeed video={video}/>
              </div>
            )
          })
        }
      </div>
      :
      <div className='text-white h-[50vh] flex justify-center items-center pl-3 text-3xl font-bold'>
        NO VIDEOS
      </div>
    }
    </>
  )
}

export default MyVideos