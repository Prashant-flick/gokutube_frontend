import axios from "axios"

const FetchComment = async (videoId) => {
    try {
        const response = await axios.get(`/api/v1/comment/get-video-comments/${videoId}`)
        return response.data.data
    } catch (error) {
        console.error(error)
    }
}

export {
    FetchComment,

}