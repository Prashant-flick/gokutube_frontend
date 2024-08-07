import { useEffect, useState } from 'react'
import { getUserChannelProfile } from '../../FetchfromBackend';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

function SubscribedChannelDetails({
    id=null,
}) {

  const [user, setuser] = useState(null)
  const navigate = useNavigate()
  const [loader, setloader] = useState(true)

  useEffect(() => {
    (async() => {
      const data = await getUserChannelProfile({id, username:null})
      setuser(data)
      if(data){
        setloader(false)
      }
    })()
  },[id])

  if(loader){
    return <Loader />
  }

  return (
      <div className='flex flex-row gap-6 items-center cursor-pointer'
        onClick={(e) => {
          e.preventDefault()
          navigate(`/channel/${user?.username}`)
          window.location.reload()
        }}
      >
        <img src={user?.avatar} className='h-20 rounded-full w-20 object-cover'/>
        <div>
          <h1 className='text-white text-lg font-bold'>{user?.fullName}</h1>
          <h1 className='text-gray-400'>@{user?.username}</h1>
        </div>
      </div>
  )
}

export default SubscribedChannelDetails