import React,{useState, useEffect} from 'react'
import { FeedSingleVideo, PlaylistFeed } from '../index.js'
import { FetchAllVidoes, fetchVideoById } from '../../FetchfromBackend/index.js'
import { useParams, useLocation } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';

function VideoPageFeedVideo() {
  const {id} = useParams()

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isplaylist = queryParams.get('playlist');

  const [videos, setVideos] = useState([])
  const [limit, setlimit] = useState(10)
  const [length, setlength] = useState(0)
  const [hasMore, sethasMore] = useState(true)

  const playlist = useSelector(state => state.playlistReducer.PlaylistData);

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

  // console.log(playlist);
  // console.log(isplaylist);
  // console.log(playlist[0]?.videos?.length);

  return (
    <>
      {
        isplaylist && 
        playlist[0]?.videos?.length>0 &&
        <div className='border border-gray-200 rounded-xl px-4 py-2'>
          {/* <InfiniteScroll
            dataLength={limit}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          > */}
            {playlist[0].videos.map((data, index) => {            
              return(
                <div 
                  key={index}
                  className='h-full w-full'
                >
                  {   
                    (data !== id) &&
                    <PlaylistFeed videoid={data}/>
                  }
                </div>
            )})}
          {/* </InfiniteScroll> */}
        </div>
      }
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
                className='h-full w-full'
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
