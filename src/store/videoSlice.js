import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    videoData : []
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        getdata: (state, action) => {
            state.videoData = action.payload
        },
    }
})

export const {getdata} = videoSlice.actions

export default videoSlice.reducer