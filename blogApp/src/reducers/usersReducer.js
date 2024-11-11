import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const blogUserSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers (state, action) {
            return action.payload
        }
    }
})

export const {setUsers} = blogUserSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        const allUsers = await usersService()
        dispatch(setUsers(allUsers))
    }
}

export default blogUserSlice.reducer