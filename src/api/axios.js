import axios from 'axios'

export default axios.create({
    baseURL: String(import.meta.env.VITE_API_URL),
    headers: {
        'Content-type': ['application/json','multipart/form-data']
    },
    withCredentials: true
})