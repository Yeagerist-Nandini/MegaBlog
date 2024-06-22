import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [{id:1, title: "",content:"",featuredImage:""}]  
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state,action) => {
            state.posts.push(action.payload);
        },
        deletePost: (state,action) => {
            state.posts = state.posts.filter((post)=>{
                post.id !== action.payload.id
            })
        },
        editPost: (state,action) => {
            state.posts = state.posts.map((post)=>{
                post.id === action.payload.id ? {...action.payload} : post 
            })
        }
    }
})

export const {addPost,editPost,deletePost} = postSlice.actions;

export default postSlice.reducer;