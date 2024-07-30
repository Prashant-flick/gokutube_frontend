import axios from "../api/axios"

const FetchAllVidoes = async({
    limit=9,
    query=""
}) => {
    try {
        const response = await axios.get(`/api/v1/videos/get-all-videos?limit=${limit}&query=${query}`);
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

const fetchVideoById = async({id, isplaying=false}) => {
    try {
        console.log(id);
        console.log(isplaying);
        const response = await axios.get(`/api/v1/videos/get-video/${id}?isplaying=${isplaying}`)
        console.log(response.data.data);
        return response?.data?.data
    } catch (error) {
        console.log(error);
    }
}


export {
    FetchAllVidoes,
    fetchUserVideo,
    fetchVideoById
}