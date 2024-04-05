import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { FetchUserPlaylist } from '../../FetchfromBackend/FetchPlaylist'
import {Button} from '../../Components/index.js'

function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const {id} = useParams()

  useEffect(() => {
    if(id){
      ;(async () => {
        const data = await FetchUserPlaylist(id)

        if(data){
          setPlaylists(data)
        }
      })()
    }
  },[id])

  return (
    <div className={`${playlists.length ? 'grid grid-cols-3 gap-4 px-5 pt-4 h-full' : 'flex justify-center items-center w-full h-[30vh]'}`}>
      {
        
        playlists.length ? playlists.map((playlist, index) => {
          return (
            <div
              key={index}
              className='flex flex-col rounded-lg justify-center items-center'
            >
              <div
                  className='border-2 border-gray-400 rounded-xl w-full'
                >
                <img src={playlist.videos.length > 0 ? playlist.videos[0]?.thumbnail : 'https://res.cloudinary.com/dbmlz6pip/image/upload/v1712024540/yuunp9v1uivwfxjxtnqb.png'} alt="Playlist Thumbnail"/>
                <h1 className='text-white'>{playlist.name}</h1>
                <h1 className='text-white'>{playlist.description}</h1>
                </div>
            </div>
          )
        }) : <Button label='Create Playlist' />
      }
      
    </div>
  )
}

export default Playlists