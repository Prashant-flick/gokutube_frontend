import React, { useState, useEffect } from 'react'
import {Button, UserAvatar} from './index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom'
import { getUserChannelProfile } from '../FetchfromBackend/FetchUser.js'

function ChannelPage() { 
  const {username} = useParams()
  const [user, setUser] = useState("some")

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get('id');

  useEffect(() => {
    (async()=>{
      const data = await getUserChannelProfile({id,username})
      setUser(data)
    })()
  },[username])

  const currentuser = useSelector(state => state.authReducer.userData)
  const [isActive, setIsActive] = useState(null)

  return (
    <>
      {
        user.coverImage ?
          <img src={user.coverImage} alt="" 
            style={{height: '23vh'}}
            className='w-full object-cover object-center rounded-2xl border-2 border-gray-800'
          />
        :
        <></>
      }
    
      <div
        className='flex flex-row justify-center w-full items-center gap-16'
        style={{height: '30vh'}}
      >
        <UserAvatar classname={'h-40 w-40'} id={user._id}/>
        <div className='flex flex-col gap-1'>
          <h1 className='text-white text-4xl font-bold'>{user.fullName}</h1>
          <h1 className='text-white'>@{user.username}</h1>
          <h1 className='text-white'>Subscribers: {user.subscribersCount}</h1>
          <h1 className='text-white'>Subscribed to: {user.SubscribedToCount}</h1>
          {
            currentuser._id === user._id ? 
              <Button label='Customize Channel' classname='mt-1 rounded-3xl'/>
            :
              <>
              {
                user.isSubscribed ?
                  <Button label='UnSubscribe' classname='mt-1 bg-gray-500 hover:bg-gray-700 rounded-3xl'/>
                  :
                  <Button label='Subscribe' classname='mt-1 rounded-3xl'/>
              }
              </>
          }
        </div>
      </div>

      <div className=''>
        <div className='flex flex-row gap-10 mb-2'>
          <Link to={`/channel/${username}/my-videos/${user._id}`}>
            <button className={`text-white text-lg ${isActive === 'my-videos' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
              onClick={()=>setIsActive('my-videos')}
            >Videos</button>
          </Link>
          <Link to={`/channel/${username}/playlists/${user._id}`}>
            <button className={`text-white text-lg ${isActive === 'playlists' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
              onClick={()=>setIsActive('playlists')}
            >Playlists</button>
          </Link>
          <button className={`text-white text-lg ${isActive === 'subscribed' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
            onClick={()=>setIsActive('subscribed')}
          >Subscribed</button>
          <button className={`text-white text-lg ${isActive === 'subscribers' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
            onClick={()=>setIsActive('subscribers')}
          >Subscribers</button>
        </div>
      </div>
    </>
  )
}

export default ChannelPage