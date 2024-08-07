import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FetchCurrentUser } from '../FetchfromBackend'
import { HistoryFeedVideo, Loader } from '../Components'

function History() {
  const [userHistory, setUserHistory] = useState([])
  const user = useSelector(state => state.authReducer.userData)
  const [loading, setloading] = useState(true)

  useEffect(() => {
    (async() => {
      const data = await FetchCurrentUser()
      setUserHistory(data?.watchHistory)
      if(data){
        setloading(false)
      }
    })()
  },[user])

  if(loading){
    return (
      <Loader />
    )
  }

  return (
    <div className='h-full w-full min-h-[90vh] px-36 py-8'>
      <h1 className='text-gray-300 font-bold text-2xl px-2'>Watch History</h1>
      {
        userHistory &&
        userHistory?.map((item, index) => {
          return (
            <div key={index} className='flex flex-row gap-2 p-2'>
              <HistoryFeedVideo id={item} />
            </div>
          )
        })
      }
    </div>
  )
}

export default History