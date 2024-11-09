import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs (state, action) {
            return action.payload
        },
        addBlog (state, action) {
            return state.concat(action.payload)
        }
    }
})

export const {setBlogs, addBlog} = blogSlice.actions

export const initialBlogsSetting = () => {
    return async dispatch => {
        const allBlogs = await blogService.getAll()
        dispatch(setBlogs(allBlogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const userStorage = window.localStorage.getItem("userLogin");
        const tokenStorage = userStorage ? JSON.parse(userStorage).token : null;
    
        blogService.setToken(tokenStorage);
    
        const blogToAdd = await blogService.create(newBlog)
        dispatch(addBlog(blogToAdd))
    }
}

export default blogSlice.reducer