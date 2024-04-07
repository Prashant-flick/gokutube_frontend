import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FetchComment } from '../../FetchfromBackend/index.js'
import { CommentData } from '../index.js'
import InfiniteScroll from "react-infinite-scroll-component";
import { setCommentData, addComment as addcommentslice } from '../../store/commentSlice.js'

function CommentContent({
  videoId=null
}) {
  const length = useSelector(state => state.commentReducer.totalComments)
  const [comments, setComments] = useState([])
  const dispatch = useDispatch()
  const [limit, setlimit] = useState(10)
  const [hasMore, sethasMore] = useState(true)

  useEffect(() => {
    if(videoId){
      ;(async()=>{
        const data = await FetchComment({videoId,limit})
        dispatch(setCommentData(data))
        setComments(prev => data.comments)
        console.log(data);
      })()
    }
  },[])

  const fetchMoreData = () => {
    if(limit>(parseInt(length/10)+(length%10 ? 1: 0))*10){
      sethasMore(false)
      return
    }
    setTimeout(async() => {
      setlimit(prev => prev+10)
      const newlimit = limit+10
      const data = await FetchComment({videoId,limit:newlimit})
      dispatch(setCommentData(data))
      setComments(prev=> data.comments)
    }, 500);    
  }

  return (  
    <>  
      {
        comments && comments.length>0 &&
        <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {comments.map((comment, index) => { 
            return (
              <div key={index} className='flex flex-col mt-2 h-full w-full'>
                <CommentData comment={comment}/>
              </div>
            )
          })}
        </InfiniteScroll>
      }
        
    </>
  )
}

export default CommentContent
