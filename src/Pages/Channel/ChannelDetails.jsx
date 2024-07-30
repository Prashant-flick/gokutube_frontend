import { ChannelPage } from '../../Components/index.js'
import { Outlet , useLocation } from 'react-router-dom'

function ChannelDetails() {
  let location = useLocation().pathname
  location = location.split('/')

  return (
    <div className='h-full w-full'>
      <div className={`px-20 py-2 flex flex-col w-full h-full bg-gray-950`}
      >
        <ChannelPage/>
        <div className='border-t-2 border-gray-800 h-full w-full'>
          {
            location.length>3 ? <Outlet/>
            :
            <div className='flex justify-center items-center h-[60vh]'>
              <h1 className='text-white text-2xl font-bold'>What's on you mind?</h1>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ChannelDetails