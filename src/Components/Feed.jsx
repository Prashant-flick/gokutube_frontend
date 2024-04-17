import React, { useEffect, useState } from 'react'
import { FetchAllVidoes, FetchUserPlaylist } from '../FetchfromBackend/index.js';
import { useSelector } from 'react-redux';
import { FeedVideo } from './index.js'
import { useDispatch } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { setplaylist } from '../store/playlistSlice.js';

function Feed() {
  const [videos, setvideos] = useState([]);
  const status = useSelector(state => state.authReducer.status);
  const [limit, setlimit] = useState(9)
  const [hasMore, sethasMore] = useState(true)
  const [length, setlength] = useState(0)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.authReducer.userData)

  useEffect(() => {
    ;(async() => {
      const data = await FetchAllVidoes({limit:limit+6});
      setvideos(prev => prev=data.videos);
      setlength(prev => prev=data.length)
      // dispatch(setvideodata(data))
    })()


    if(status){
      ;(async() => {
        console.log(currentUser._id);
        const data = await FetchUserPlaylist(currentUser?._id)
        dispatch(setplaylist(data))
      })()
    }
  },[])

  const fetchMoreData = () => {
    if(limit-6>length){
      sethasMore(false)
      return
    }
    setTimeout(async() => {
      setlimit(prev => prev+6)
      const newlimit = limit+6
      const data = await FetchAllVidoes({limit:newlimit})
      setvideos(prev => prev=data.videos)
      setlength(prev => prev=data.length)
    }, 500);    
  }
  
  return (
    <div 
      className='bg-gray-950 w-full h-full'
    >
        {
          videos.length>0 &&
          <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          
            <div 
              className={`${'grid grid-cols-3 h-full mt-3 mx-2'}`}
            >
              {videos.map((video, index) => {
                return (
                  <div 
                    key={index}
                    className='flex flex-col rounded-lg justify-center items-center'
                  >
                    <div
                      className='h-full w-full'
                    >
                    <FeedVideo video={video}  />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>
        }
    </div>
  )
}

export default Feed