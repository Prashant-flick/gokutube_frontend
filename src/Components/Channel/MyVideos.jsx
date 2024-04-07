import React, { useEffect, useState } from 'react'
import { fetchUserVideo} from '../../FetchfromBackend'
import { useParams, Link } from 'react-router-dom'
import { Input, Button, FeedVideo } from '../index.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MyVideos() {
  const [videos, setVideos] = useState([])
  const [showUploadSection, setShowUploadSection] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    if(id){
      ;(async () => {
        const data = await fetchUserVideo(id)
        if(data){
          setVideos(data.videos)
        }
      })()
    }
  },[])

  console.log(videos);

  //Upload Video
  const uploadVideo = async(e) => {
    e.preventDefault()
    const { Title, Description, VideoFile, Thumbnail } = e.target;
    const form = new FormData(); 

    //appending files
    form.append('videoFile', VideoFile.files[0]);
    form.append('thumbnail', Thumbnail.files[0]);

    //appending other data
    form.append('title', Title.value);
    form.append('description', Description.value);

    setShowUploadSection(prev=> prev=false)
    
    try {
      const data = await axios.post('/api/v1/videos/publish-video', form,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (error) {
      console.log(error);
      setShowUploadSection(prev=> prev=false)
      console.error('error while uploading video');
    }
  }

  return (
    <>
    {
      videos.length ? 
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
              <Input className="w-[70%]" label='Title' name='Title' type='text' />
              <Input className="w-[70%]" label='Description' name='Description' type='text' />
              <Input label='VideoFile' name='VideoFile' type='file' />
              <Input label='Thumbnail' name='Thumbnail' type='file' />
              <Button label='Upload'/>
            </form>
          </div>
          :
          <></>
        }
        
        <Button onClick={(e)=>setShowUploadSection(prev=> prev=!prev)} label='Upload Video' classname='ml-3 mb-0 mt-1 rounded-3xl'/>
      </div>
      :
      <></>
    }
    <div className={`${videos.length ? 'grid grid-cols-3 gap-6 px-5 h-full' : 'flex justify-center items-center h-[29vh]'}`}>
      {
        videos.length>0 && videos.map((video, index) => {
          return (
            <div
              key={index}
              className='flex flex-col rounded-lg mt-1 w-full h-full'
            >
                <Link to={`/videos/${video._id}`}>
                  <FeedVideo video={video} myvideo={true} />
                </Link>
            </div>
          )
        })
      }
      
    </div>
    </>
  )
}

export default MyVideos