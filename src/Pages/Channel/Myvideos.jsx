import React,{useState, useEffect} from 'react'
import { MyVideos } from '../../Components/index.js'

function Myvideos() {

  const [loader , setloader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setloader(false)
    }, 400)
  })

  return (
    <>
      {
        loader &&
        <div className='w-full h-[30vh] flex justify-center items-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100'></div>
        </div>
      }
      <div className={`h-full w-full ${loader && "hidden"}`}>
        <MyVideos/>
      </div>
    </>
    
  )
}

export default Myvideos