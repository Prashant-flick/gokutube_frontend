import React,{useState, useEffect} from 'react'
import { FetchComment } from '../../FetchfromBackend/index.js'
import { CommentContent, UserAvatar, Button } from '../index.js'
import axios from 'axios'

function GetVideoComments({
  id=null
}) {
  const [comments, setComments] = useState([])
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if(id){
      ;(async()=>{
        const data = await FetchComment(id)
        setComments((prev) => prev=data)
      })()
    }
  },[])

  const showButton = (e) => {
    e.preventDefault()
  
    if(e.target.name === 'input'){
      setShow((prev) => prev=true)
    }else if(e.target.name === 'button'){
      setShow((prev) => prev=false)
    }
  }

  const addComment = async(e) => {
    e.preventDefault()
    const data = await axios.post(`/api/v1/comment/add-comment/${id}?content=${comment}`,{text: comment})
    if(data.status === 200){
      location.reload()
    }
  }

  return (
    <>
      <h1 className='px-3 pt-2 text-2xl font-bold text-white'>{comments.length} Comments</h1>
      <div className='px-3 mb-3 gap-3 flex mt-3 flex-row w-full h-full'>
        <UserAvatar/>
        <div className='flex flex-col w-full'>
          <input 
            name='input'
            onClick={(e) => showButton(e)} 
            onKeyDown={(e) => {
              if(e.key === 'Enter'){
                addComment(e)
              }
            }}
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            type="text" 
            placeholder='Add a Comment...' 
            className='outline-none border-b border-gray-500 bg-gray-950 w-full text-white pl-2'
          />
          <div className={`${!show && 'hidden'} flex gap-3 flex-row justify-end`}>
            <Button name='button' onClick={(e) => showButton(e)} label='Cancel' classname='rounded-3xl h-10' />
            <Button onClick={(e) => addComment(e)} label='Comment' classname='rounded-3xl h-10'/>
          </div>
        </div>
      </div>
      {
        comments && comments.length>0 && comments.map((comment, index) => {
          return (
            <div key={index} className='flex flex-col mt-2'>
              <CommentContent comment={comment}/>
            </div>
          )
        })
      }
    </>
  )
}

export default GetVideoComments
