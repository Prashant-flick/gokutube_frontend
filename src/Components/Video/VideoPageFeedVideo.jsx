import React,{useState, useEffect} from 'react'
import { FeedSingleVideo } from '../index.js'
import { FetchAllVidoes } from '../../FetchfromBackend/index.js'
import { useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";

function VideoPageFeedVideo() {
  const {id} = useParams()
  const [videos, setVideos] = useState([])
  const [limit, setlimit] = useState(10)
  const [length, setlength] = useState(0)
  const [hasMore, sethasMore] = useState(true)

  useEffect(() => {
    ;(async()=>{
      const data = await FetchAllVidoes({limit})
      setVideos((prev) => prev=data.videos)
      setlength((prev) => prev=data.length)
    })()
  },[id])

  const fetchMoreData = () => {
    if(limit-10>length){
      sethasMore(false)
      return
    }
    setTimeout(async() => {
      setlimit(prev => prev+10)
      const newlimit = limit+10
      const data = await FetchAllVidoes({limit:newlimit})
      setVideos(prev => prev=data.videos)
    }, 500);    
  }

  return (
    <>
      {
        videos && videos.length>0 &&
        <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {videos.map((data, index) => {            
            return(
              <div 
                key={index}
                className='py-2 pl-1 flex h-full w-full flex-row'
              >
                {
                  (data?._id != id) &&
                  <FeedSingleVideo video={data}/>
                }
              </div>
          )})}
        </InfiniteScroll>
      }
    </>
  )
}

export default VideoPageFeedVideo
