import { Playlists } from '../../Components'

function Playlist() {
  window.addEventListener('popstate', function() {
    window.location.reload()
  });
  return (
    <Playlists />
  )
}

export default Playlist
