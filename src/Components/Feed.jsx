import React, { useEffect, useState } from 'react'
import { FetchAllVidoes } from '../FetchfromBackend/index.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FeedVideo } from './index.js'

function Feed() {
  const [videos, setvideos] = useState([]);
  const user = useSelector(state => state.authReducer.userData);
  const status = useSelector(state => state.authReducer.status);

  useEffect(() => {
    if(status){
      ;(async() => {
        const data = await FetchAllVidoes();
        setvideos(data);
      })()
    }
  },[])

  return (
    <div 
      className='bg-gray-950 w-full h-full'
    >
      <div 
        className={`${status ? 'grid grid-cols-3 gap-4 px-5 pt-4 h-full' : 'flex justify-center items-center h-[90vh]'}`}
      >

        {
          status && videos.length>0 ? videos.map((video, index) => {
            return (
              <div 
                key={index}
                className='flex flex-col rounded-lg justify-center items-center'
              >
                <div
                  className='h-full w-full'
                >
                <FeedVideo video={video}/>
                  
                </div>
              </div>
            )
          }) : status ? <div className='text-white text-3xl'>NO VIDEOS</div> : 
          <Link to='/login'>
            <div className='text-white text-3xl'>LogIn</div>
          </Link>
        }
      </div>
    </div>
  )
}

export default Feed