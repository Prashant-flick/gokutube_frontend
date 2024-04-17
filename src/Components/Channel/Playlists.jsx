import React,{useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { FetchUserPlaylist } from '../../FetchfromBackend/FetchPlaylist'
import { setplaylist as setplaylistdata } from '../../store/playlistSlice'
import { useDispatch } from 'react-redux'

function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if(id){
      ;(async () => {
        const data = await FetchUserPlaylist(id)

        if(data){
          setPlaylists(data)
          dispatch(setplaylistdata(data))
        }
      })()
    }
  },[id])
  

  return (
    <div className={`${playlists.length ? 'grid grid-cols-3 gap-4 px-5 pt-4 h-full mt-4' : 'flex justify-center items-center w-full h-[30vh]'}`}>
      {
        
        playlists.length>0 && playlists.map((playlist, index) => {
          return (
            <div
              key={index}
              className='flex flex-col rounded-lg justify-center items-center'
            >
              <div
                className='rounded-xl w-full h-full'
              >

              <Link to={`${playlist.videos.length>0 ? `/videos/${playlist.videos[0]}?playlist=true` : window.location.href}`}>
                <img 
                className='object-cover object-center overflow-hidden pt-1.5 rounded-lg bg-gray-500'
                src={playlist.videos.length > 0 ? playlist.Thumbnail : 'https://res.cloudinary.com/dbmlz6pip/image/upload/v1712024540/yuunp9v1uivwfxjxtnqb.png'} 
                alt="Playlist Thumbnail"/>
              </Link>
              <div className='flex flex-row justify-between py-2 '>
                <h1 className='text-white ml-1'>{playlist.name}</h1>
                <h1 className='text-white mr-1'>{playlist.videos?.length} videos</h1>
              </div>
              <button className='text-white text-sm ml-1 mt-1 hover:text-gray-300'>view full playlist</button>
              </div>
            </div>
          )
        })
      }
      
    </div>
  )
}

export default Playlists