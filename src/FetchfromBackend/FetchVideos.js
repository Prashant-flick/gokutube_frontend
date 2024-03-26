import axios from "axios"

const FetchAllVidoes = async() => {
    try {
        const response = await axios.get('/api/v1/videos/get-all-videos');

        return response.data.data
    } catch (error) {
        console.log(error);
    }
    return null;
}

const fetchUserVideo = async(userId) => {
    try {
        const response = await axios.get(`/api/v1/videos/get-all-videos?userId=${userId}`)
    
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

const fetchVideoById = async(id) => {
    try {
        const response = await axios.get(`/api/v1/videos/get-video/${id}`)
      
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}


export {
    FetchAllVidoes,
    fetchUserVideo,
    fetchVideoById
}