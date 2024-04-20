import axios from 'axios'

export default axios.create({
    baseURL: 'https://gokutube-fullstack-backend.vercel.app',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})