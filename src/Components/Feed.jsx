import React, { useEffect, useState } from 'react'
import { FetchAllVidoes, FetchUserPlaylist } from '../FetchfromBackend/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { FeedVideo, Loader } from './index.js'
import InfiniteScroll from "react-infinite-scroll-component";
import { setplaylist } from '../store/playlistSlice.js';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios.js';

function Feed() {
  const [videos, setvideos] = useState([]);
  const status = useSelector(state => state.authReducer.status);
  const [limit, setlimit] = useState(9)
  const [hasMore, sethasMore] = useState(true)
  const [length, setlength] = useState(0)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.authReducer.userData)
  const [loader, setloader] = useState(true)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');
  const subscription = queryParams.get('subscription');

  useEffect(() => {
    
    if(subscription){
      (async() => {
        const subscriptionData = await axios.get(`/api/v1/subscription/get-subscribed-to/${currentUser?._id}`)
        const data = await axios.post(`/api/v1/videos/get-all-subscription-videos`, {
          allsubscribedId: subscriptionData.data.data
        })
        setvideos(data.data.data.videos);
        setlength(data.data.data.length);
        if(data){
          setloader(false);
        }
      })()
    }else{
      (async() => {
        const data = await FetchAllVidoes({limit:limit+6, query:(search==null ? "" : search)});
        setvideos(data.videos);
        setlength(data.length)
        if(data){
          setloader(false);
        }
      })()
    }


    if(status){
      (async() => {
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
      if(subscription){
        const subscriptionData = await axios.get(`/api/v1/subscription/get-subscribed-to/${currentUser?._id}`)
        const data = await axios.post(`/api/v1/videos/get-all-subscription-videos`, {
          allsubscribedId: subscriptionData.data.data
        })
        setvideos(data.data.data.videos);
        setlength(data.data.data.length);
      }else{
        const data = await FetchAllVidoes({limit:newlimit})
        setvideos(data.videos)
        setlength(data.length)
      }
    }, 500);    
  }

  window.addEventListener('popstate', function() {
    // Your event handling code here
    window.location.reload()
  });

  if(loader){
    return (
      <Loader />
    )
  }
  
  return (
    <div 
      className='bg-gray-950 w-full h-full min-h-[90vh]'
    >
        {
          videos && videos.length>0 &&
          <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
            {
              subscription &&
              <h1 className='text-white px-8 pb-0 mb-0 py-2 text-2xl font-bold'>Lastest Videos</h1>
            }
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