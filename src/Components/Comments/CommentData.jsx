import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {deleteComment as deleteCommentAction, updateComment as updateCommentAction} from '../../store/commentSlice.js'

function CommentData({
    comment=null,
}) {
  console.log(comment);
  const [showSettingOptions, setShowSettingOptions] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const currentUser = useSelector(state => state.authReducer.userData)
  const dispatch = useDispatch()
  const [readonly, setreadonly] = useState(true)
  const [content, setcontent] = useState(comment.content)
  const [likes, setlikes] = useState(comment.Likes)
  const [likedbyme, setlikedbyme] = useState(comment.likedbyme)

  const deleteComment = async(e) => {
    e.preventDefault()
    await axios.delete(`/api/v1/comment/delete-comment/${comment._id}`)
    dispatch(deleteCommentAction(comment))
  }

  const updateComment = async(e) => {
    e.preventDefault()
    console.log('here');
    const newcomment = await axios.post(`/api/v1/comment/update-comment/${comment._id}?content=${content}`)
    dispatch(updateCommentAction(newcomment.data.data))
    setreadonly(true)
  }

  const toggleCommentLike = async(e) => {
    e.preventDefault()
    const data = await axios.post(`/api/v1/like/toggle-comment-like/${comment._id}`)
    console.log(data.data.data);
    if(data.data.data === 'like'){
      setlikedbyme(true)
      setlikes(prev => prev+1);
    }else{
      setlikedbyme(false)
      setlikes(prev => prev-1)
    }
  }

  return (
    <>
    {
      comment && 
      <div 
        className={`relative px-3 flex flex-row w-full h-full bg-gray-950 hover:bg-gray-800 rounded-xl py-3 ${comment.ownerUsername === currentUser.username ? '' : ''}`}
        onMouseEnter={(e) => {
          e.preventDefault()
          setShowSetting(true)
        }}
        onMouseLeave={(e) => {
          e.preventDefault()
          setShowSetting(false)
          setShowSettingOptions(false)
        }}
    >
        <div className="flex flex-row gap-5 h-full w-full">
        <img src={comment.ownerAvatar} alt="user avatar" className='w-12 h-12 rounded-full'/>
        <div className='flex flex-col w-full'>
            <h1 className='text-gray-400'>@{comment.ownerUsername}</h1>
            <input
              onChange={(e) => {
                e.preventDefault()
                setcontent(e.target.value)
              }}
            type="text" value={content} className={`p-0 bg-transparent text-white w-full outline-none ${!readonly && 'border-b border-b-gray-500'}`} readOnly={readonly}/>
            {
              !readonly &&
              <div className='gap-2 mt-2 flex flex-row justify-end'>
                <button onClick={(e) => {
                  e.preventDefault()
                  setreadonly(true)
                  setcontent(comment.content)
                }} 
                className='bg-gray-600 h-7 px-1 rounded-xl hover:bg-gray-950 hover:text-gray-300'>
                  cancel
                </button>
                <button 
                  onClick={(e) => updateComment(e)}
                  className='bg-gray-600 h-7 px-1 rounded-xl hover:bg-gray-950 hover:text-gray-300'>
                  update
                </button>
              </div> 
            }
            <button
              onClick={(e) => toggleCommentLike(e)}
              className={`mt-2 w-14 rounded-xl gap-1 justify-center flex flex-row ${likedbyme ? 'bg-gray-400' : 'bg-gray-700'}`}>
              {likes}
              <img className='h-5 bg-transparent' src="https://cdn.iconscout.com/icon/free/png-256/free-like-2190245-1853251.png" alt="like" />
            </button>
        </div>
        </div>
        {
        comment.ownerUsername === currentUser.username &&
        <>
            <button onClick={(e) => {
                e.preventDefault()
                setShowSettingOptions(prev => !prev)
            }}
            className={`text-white ${!showSetting && "hidden"} px-2`}
            >
            :
            </button>
            <div className={`py-1 ${!showSettingOptions && "hidden"} rounded-2xl h-14 w-20 bg-gray-600 flex flex-col absolute top-2 right-8`}>
            <button
              onClick={(e) => {
                e.preventDefault()
                setreadonly(false)
                setShowSettingOptions(false)
              }}
              className='border-b-2 w-full border-gray-800'
            >Edit</button>
            <button onClick={(e)=>deleteComment(e)}>Delete</button>
            </div>
        </>
        }
      </div>
    }  
    </>
  )
}

export default CommentData
