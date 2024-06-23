import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []  
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        Posts : (state,action) => {
            state.posts = action.payload
        },
        addPost: (state,action) => { 
            state.posts.push(action.payload);
        },
        deletePost: (state,action) => {
            state.posts = state.posts.filter((post)=>
                post.$id !== action.payload
            )
        },
        editPost: (state,action) => {
            state.posts = state.posts.map((post)=>
                post.$id === action.payload.$id ? {
                    ...post,
                    title: action.payload.title,
                    featuredImage: action.payload.featuredImage,
                    status: action.payload.status,
                    content: action.payload.content,
                } : post 
            )
        }
    }
})

export const {addPost,editPost,deletePost,Posts} = postSlice.actions;

export default postSlice.reducer;