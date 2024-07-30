import { MyVideos } from '../../Components/index.js'

function Myvideos() {

  window.addEventListener('popstate', function() {
    window.location.reload()
  });

  return (
    <>
      <div className={`h-full w-full`}>
        <MyVideos/>
      </div>
    </>
    
  )
}

export default Myvideos