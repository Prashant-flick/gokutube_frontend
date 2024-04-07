import React, { useEffect, useState } from 'react'
import { FetchAllVidoes } from '../FetchfromBackend/index.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FeedVideo } from './index.js'
import InfiniteScroll from "react-infinite-scroll-component";

function Feed() {
  const [videos, setvideos] = useState([]);
  const status = useSelector(state => state.authReducer.status);
  const [limit, setlimit] = useState(9)
  const [hasMore, sethasMore] = useState(true)
  const [length, setlength] = useState(0)

  useEffect(() => {
    if(status){
      ;(async() => {
        const data = await FetchAllVidoes({limit});
        setvideos(prev => prev=data.videos);
        setlength(prev => prev=data.length)
      })()
    }
  },[])

  const fetchMoreData = () => {
    if(limit-6>length){
      sethasMore(false)
      return
    }
    console.log(limit);
    setTimeout(async() => {
      setlimit(prev => prev+6)
      const newlimit = limit+6
      const data = await FetchAllVidoes({limit:newlimit})
      setvideos(prev => prev=data.videos)
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
              className={`${status ? 'grid grid-cols-3 gap-7 px-6 pt-4 h-full mt-3' : 'flex justify-center items-center h-[90vh]'}`}
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
                    <Link to={`/videos/${video._id}`}>
                      <FeedVideo video={video}  />
                    </Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>

          //  : status ? <div className='text-white text-3xl'>NO VIDEOS</div> : 
          // <Link to='/login'>
          //   <Button label='LOGIN' classname='text-3xl rounded-2xl px-5 py-4'/>
          // </Link>
        }
    </div>
  )
}

export default Feed