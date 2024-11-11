import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            if (action.payload.type === 'SET_USER') {
                return action.payload.user
            } else if (action.payload.type === 'RESET_USER') {
                return null
            } else {
                return state
            }
        }
    }
})

export const {setUser} = userSlice.actions

export const setLoggedInUser = () => {
    return dispatch => {
        const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (loggedInUser) dispatch(setUser({type: 'SET_USER', user: loggedInUser}))
        else return null
    }
}

export const loginUser = (userCredentials) => {
    return async dispatch => {
        try {
            const user = await loginService(userCredentials)
            dispatch(setUser({type: 'SET_USER', user}))
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        } catch (error) {
            dispatch({
              type: 'notifications/createNotification',
              payload: {
                display: error.error,
                type: 'ERROR'
              }
            });
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

export const logoutUser = () => {
    return dispatch => {
        dispatch(setUser({type: 'RESET_USER'}))
        window.localStorage.clear()
    }
}

export default userSlice.reducer