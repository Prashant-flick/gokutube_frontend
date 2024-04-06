import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {deleteComment as deleteCommentAction} from '../../store/commentSlice.js'

function CommentData({
    comment=null,
}) {
  const [showSettingOptions, setShowSettingOptions] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const currentUser = useSelector(state => state.authReducer.userData)
  const dispatch = useDispatch()

  const deleteComment = async({e,comment}) => {
    e.preventDefault()
    await axios.delete(`/api/v1/comment/delete-comment/${comment._id}`)
    dispatch(deleteCommentAction(comment))
  }

  return (
    <>
    {
      comment && 
      <div 
        className={`relative px-3 flex flex-row w-full h-full bg-gray-950 hover:bg-gray-800 rounded-xl py-3 ${comment.ownerUsername === currentUser.username ? '' : ''}`}
        onMouseEnter={() => setShowSetting(true)}
        onMouseLeave={() => {
        setShowSetting(false)
        setShowSettingOptions(false)
        }}
    >
        <div className="flex flex-row gap-5 h-full w-full">
        <img src={comment.ownerAvatar} alt="user avatar" className='w-12 h-12 rounded-full'/>
        <div className='flex flex-col'>
            <h1 className='text-gray-400'>@{comment.ownerUsername}</h1>
            <p className='text-white'>{comment.content}</p>
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
                className='border-b-2 w-full border-gray-800'
            >Edit</button>
            <button onClick={(e)=>deleteComment({e,comment})}>Delete</button>
            </div>
        </>
        }
      </div>
    }  
    </>
  )
}

export default CommentData
