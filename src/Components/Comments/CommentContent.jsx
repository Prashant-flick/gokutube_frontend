import React,{useEffect, useState} from 'react'
import { getUserChannelProfile } from '../../FetchfromBackend/index.js'
import { useSelector } from 'react-redux'

function CommentContent({
  comment=null
}) {
  const [user, setUser] = useState(null)
  const currentUser = useSelector(state => state.authReducer.userData)

  useEffect(() => {
    if(comment){
      ;(async()=>{
        const data = await getUserChannelProfile({
          id:comment.owner,
          username: null
        })
        setUser((prev) => prev=data)
      })()
    }
  },[])

  return (
    <>
      {
        user && 
        <div className='px-3 flex flex-row gap-3 w-full h-full bg-gray-950 mt-2'>
          <img src={user.avatar} alt="user avatar" className='w-12 h-12 rounded-full'/>
          <div className='flex flex-col'>
            <h1 className='text-gray-400'>@{user.username}</h1>
            <p className='text-white'>{comment.content}</p>
          </div>
        </div>
      }
    </>
  )
}

export default CommentContent
