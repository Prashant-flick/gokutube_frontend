import {useEffect, useState} from 'react'
import axios from '../../api/axios.js'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader, SubscribedChannelDetails } from '../index.js'

function Subscribed() {
  const [subscribed, setsubscribed] = useState([])
  const {id} = useParams()
  const [limit, setlimit] = useState(10)
  const [hasMore, sethasMore] = useState(true)
  const [loader, setloader] = useState(true)


  useEffect(() => {
    (async() => {
      const data = await axios.get(`/api/v1/subscription/get-subscribed-to/${id}?limit=${limit}`)
      setsubscribed(data.data.data)
      if(data){
        setloader(false);
      }
    })()
  },[id, limit])


  const fetchMoreData = async() => {

  }

  if(loader){
    return <Loader />
  }

  return (
    <div className='h-full w-full min-h-[53vh]'>
      <div className='px-20 py-6 flex flex-col'>
        <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {
            subscribed.length ?
            subscribed.map((item, index) => {
              return (
                  <div key={index} className='h-full w-full py-4 hover:bg-gray-800 px-4 rounded-2xl'>
                    <SubscribedChannelDetails id={item.channel}/>
                  </div>
              )
            })
            :
            <h1 className='text-white'>No Subscriptions</h1>
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Subscribed