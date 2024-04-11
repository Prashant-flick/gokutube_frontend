import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

function SideBar() {

  const [isActive, setIsActive] = useState('')
  const authstatus = useSelector(state => state.authReducer.status)
  const user = useSelector(state => state.authReducer.userData)
  const navigate = useNavigate()
  let value = window.location.href
  value = value.split('/')

  useEffect(() => {
    if(value.length===4){
      setIsActive('Home')
    }else if(value.length>=5){
      setIsActive('You')
    }
  })

  const changeActive = (e) => {
    if(e.name == 'Home'){
      navigate('/')
    }
    else if(authstatus){
      navigate(e.path)
    }else{
      navigate('/login')
    }
  }

  return (
    <div className='z-50 px-1 pt-2 flex flex-col w-56 bg-gray-800 sticky h-full' style={{height: '90vh'}}>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='Home' ? 'bg-gray-400 rounded-2xl' : 'bg-gray-800'}`}
        onClick={()=> changeActive({name:'Home', path:'/'})}
      >
        <div className=''>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        </div>
        <h1 className={`${isActive==='Home' ? 'text-black' : 'text-white'}`}>
          Home
        </h1>
      </button>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='Subscriptions' ? 'bg-gray-400 rounded-2xl' : 'bg-gray-800'}`}
        onClick={()=> changeActive({name:'Subscriptions', path:'/'})}
      >
        <div className=''>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>
        </div>
        <h1 className={`${isActive==='Subscriptions' ? 'text-black' : 'text-white'}`}>Subscriptions</h1>
      </button>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='You' ? 'bg-gray-400 rounded-2xl' : 'bg-gray-800'}`}
        onClick={()=> changeActive({name:'You', path:`/channel/${user?.username}`})}
      >
        <div className=''>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        </div>
        <h1 className={`${isActive==='You' ? 'text-black' : 'text-white'}`}>You</h1>
      </button>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='Tweets' ? 'bg-gray-400 rounded-2xl' : 'bg-gray-800'}`}
        onClick={()=> changeActive({name:'Tweets', path:`/`})}
      >
        <div className=''>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>
        </div>
        <h1 className={`${isActive==='Tweets' ? 'text-black' : 'text-white'}`}>Tweets</h1>
      </button>


    </div>
  )
}

export default SideBar