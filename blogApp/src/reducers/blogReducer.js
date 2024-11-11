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
        },
        updateBlog (state, action) {
            return [...state].map(blog => blog.id === action.payload.id ? action.payload : blog)
        },
        removeBlog (state, action) {
            return [...state].filter(blog => blog.id !== action.payload.id)
        }
    }
})

export const {setBlogs, addBlog, updateBlog, removeBlog} = blogSlice.actions

export const initialBlogsSetting = () => {
    return async dispatch => {
        const allBlogs = await blogService.getAll()
        dispatch(setBlogs(allBlogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const userStorage = window.localStorage.getItem("loggedInUser");
        const tokenStorage = userStorage ? JSON.parse(userStorage).token : null;
    
        blogService.setToken(tokenStorage);
    
        try {
            const blogToAdd = await blogService.create(newBlog)
            dispatch(addBlog(blogToAdd))
            dispatch({
                type: 'notifications/createNotification',
                payload: {
                  display: `A new Blog ${blogToAdd.title} by ${blogToAdd.author}`,
                  type: 'SUCCESS'
                }
              })
              setTimeout(() => {
                dispatch({
                  type: 'notifications/createNotification',
                  payload: {
                    type:  'RESET'
                  }
                })
              }, 5000);
            } catch (error) {
              dispatch({
                type: 'notifications/createNotification',
                payload: {
                  display: error.error, 
                  type: 'ERROR'
                }
              })
              setTimeout(() => {
                dispatch({
                  type: 'notifications/createNotification',
                  payload: {
                    type: 'RESET'
                  }
                })
              }, 5000);
            } 
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const tokenStorage = window.localStorage.getItem("loggedInUser");
        const token = JSON.parse(tokenStorage).token;
        blogService.setToken(token);
        const updatedBlog = await blogService.update(blog, blog.id)
        dispatch(updateBlog(updatedBlog))
    }
}

export const addBlogComment = (blog, comment) => {
    return async dispatch => {
        const tokenStorage = window.localStorage.getItem("loggedInUser");
        const token = JSON.parse(tokenStorage).token;
        blogService.setToken(token);
        try {
            const updatedBlog = await blogService.addComment(blog.id, comment)
            dispatch(updateBlog(updatedBlog))
            dispatch({
                type: "notifications/createNotification",
                payload: {
                  type: 'SUCCESS',
                  display: `Comment Added to ${blog.title}`
                }
              })
              setTimeout(() => {
                dispatch({
                  type: "notifications/createNotification",
                  payload: {
                    type: 'RESET'
                  }
                })
              }, 5000)
          } catch(error) {
            dispatch({
              type: "notifications/createNotification",
              payload: {
                type: 'ERROR',
                display: error.error
              }
            })
            setTimeout(() => {
              dispatch({
                type: "notifications/createNotification",
                payload: {
                  type: 'RESET'
                }
              })
            }, 5000)
          }
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        const tokenStorage = window.localStorage.getItem("loggedInUser");
        const token = JSON.parse(tokenStorage).token;
        blogService.setToken(token);
  
        try {
            await blogService.deleteBlog(blog.id)
            dispatch(removeBlog(blog))
            dispatch({
                type: "notifications/createNotification",
                payload: {
                    display: `${blog.title} deleted successfully`,
                    type: 'SUCCESS'
                }
            })
            setTimeout(() => {
                dispatch({
                type: "notifications/createNotification",
                payload: {
                    type: 'RESET'
                }
            })
        }, 5000)
        } catch (error) {
            dispatch({
              type: 'notifications/createNotification',
              payload: {
                display: error.error,
                type: 'ERROR'
              }
            })
            setTimeout(() => {
                dispatch({
                type: "notifications/createNotification",
                payload: {
                    type: 'RESET'
                }
            })
        }, 5000)
}
    }
}

export default blogSlice.reducer