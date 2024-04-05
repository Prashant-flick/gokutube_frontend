import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    commentData: [],
}

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentData(state, action) {
      state.commentData = action.payload;
    },
    addComment: (state, action) => {
      state.commentData = [action.payload, ...state.commentData]
    },
    deleteComment: (state, action) => {
      state.commentData = state.commentData.filter(comment => comment._id !== action.payload)
    },
    updateComment: (state, action) => {
      state.commentData = state.commentData.map(comment => {
        if(comment._id === action.payload._id) {
          return action.payload
        }
        return comment
      })
    },

  },
})

export const {addComment, deleteComment, updateComment, setCommentData} = commentSlice.actions

export default commentSlice.reducer