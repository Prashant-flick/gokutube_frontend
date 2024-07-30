import { Outlet } from 'react-router-dom'
import {
  Header,
  SideBar
} from './Components/index.js'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const title = location.pathname.split('/')[1]

  window.addEventListener('popstate', function() {
    window.location.reload()
  });

  return (
    <div className='bg-gray-950 h-full'>
      <Header />
      <div className='flex flex-row w-full h-full pt-[10vh]'
      >
        {
          title === 'videos' ? null
          :
          <div className='fixed h-full'>
            <SideBar/>
          </div>
        } 
        
        <div className={`${title==='videos' ? '' : 'ml-56'} w-full h-full`}>
          <Outlet />
        </div>
        
      </div>
    </div>
  )
}

export default App