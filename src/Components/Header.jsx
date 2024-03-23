import React, { useEffect } from 'react'
import {Logo, SearchBar, UserAvatar} from './index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
  const status = useSelector(state => state.authReducer.status)
  const user = useSelector(state => state.authReducer.userData)

  return (
      <div className='flex flex-row bg-gray-800 fixed top-0 left-0 right-0 justify-between items-center px-7 border-b-2 border-gray-700'
        style={{height: '10vh'}}
      >
        <Link to='/'>
          <Logo width='35%' />
        </Link>
        <SearchBar />
        <ul>
        {
          status ? 
          <li>
            <Link to={`/channel/${user.username}`}>
              <UserAvatar username={user.username}/>
            </Link>
          </li>
          :
          <li>
            <Link to='/login'>
              <UserAvatar/>
            </Link>
          </li>
        }
        </ul>
      </div>
  )
}

export default Header