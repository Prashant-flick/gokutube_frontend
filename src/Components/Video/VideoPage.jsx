import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { fetchVideoById, getUserChannelProfile, FetchAllVidoes } from '../../FetchfromBackend/index.js'
import { useParams } from 'react-router-dom'
import { Button, GetVideoComments, VideoPageFeedVideo } from '../index.js'
import { useSelector } from 'react-redux'

function VideoPage() {
  const [user, setUser] = useState(null)
  const [video , setVideo] = useState(null)
  const [videos, setVideos] = useState([])
  const { id } = useParams()
  const currentUser = useSelector(state => state.authReducer.userData)

  useEffect(() => {
    if(id){
      ;(async()=>{
        const data = await fetchVideoById(id)
        setVideo((prev) => prev=data)
        
        if(data){
          ;(async()=>{
            const data2 = await getUserChannelProfile({
              id:data.owner,
              username: null
            })
            setUser((prev) => prev=data2)
          })()
        }
      })()
    }
  },[id])

  useEffect(() => {
    ;(async()=>{
      const data = await FetchAllVidoes()
      setVideos((prev) => prev=data)
    })()
  },[id])

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
    <div className='bg-gray-950 flex flex-row h-full w-full'>
        {
          video && user && 
          <div className='pl-20 pt-10 flex flex-col w-[67vw] h-full'>
            <video controls src={video.videoFile} className='h-[70vh] rounded-2xl w-full overflow-hidden object-cover object-center'/>
            <h1 className='pt-3 ml-3 pb-2 text-white text-2xl font-bold'>{video.title}</h1>
            <div className='ml-3 gap-2 mt-1 flex flex-row mb-3 items-center w-full h-full'> 
              <div className='flex flex-row h-full w-full items-center'>
                <Link to={`/channel/${user.username}?id=${video.owner}`}>
                  <img src={user.avatar} alt="User Profile"
                  className='rounded-full h-12 w-12'
                  />
                </Link>
                
                <div className='pl-2 flex flex-col h-full'>
                  <h1 className='text-gray-100 text-2xl font-semibold'>{user.username}</h1>
                  <h2 className='text-gray-100'>{user.subscribersCount} subscribers</h2>
                </div>
                {
                  currentUser._id === user._id ?
                  null
                  :
                  <Button label={`${user.isSubscribed ? 'Subscribed' : 'Subscribe'}`} classname={`${user.isSubscribed ? 'bg-gray-500 hover:bg-gray-600' : ''} ml-3 mt-0 rounded-3xl h-full`}/>
                }
              </div>
              <div className='flex flex-row gap-3 w-full h-full items-center justify-end mr-3'>
                <Button label='Like' classname='rounded-3xl mt-0 h-full'/>
                <Button label='DisLike' classname='rounded-3xl mt-0 h-full'/>
                <Button label='Share' classname='rounded-3xl mt-0 h-full'/>
              </div>
            </div>

            <div className='px-3 rounded-2xl py-2 bg-gray-700 flex flex-col h-full w-full'>
              <div className='flex flex-row gap-4'>
                <h1 className='text-white font-semibold' >{video.views} views</h1>
                <h1 className='text-white font-semibold' >{CalcTimeFromNow()}</h1>
              </div>
              <h1 className='text-gray-300 mt-1'>{video.description}</h1>
            </div>

            <div className='w-full h-full flex flex-col'>
              <GetVideoComments id={video._id} />
            </div>
          </div>
        }
      <div className='flex flex-col w-[33vw] h-full px-4 pt-4'>
        {
          videos && videos.length>0 &&
          videos.map((data, index) => {            
            return(
              <div 
                key={index}
                className='py-2 pl-1 flex h-full w-full flex-row'
              >
                {
                  (data?._id != video?._id) &&
                  <VideoPageFeedVideo video={data}/>
                }
              </div>
          )})
        }
      </div>
    </div>
  )
}

export default VideoPage
