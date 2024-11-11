import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
        createNotification (state, action) {
            if (action.payload.type === 'SUCCESS') {
                return {
                    display: action.payload.display,
                    error: false
                }
            }
            else if (action.payload.type === 'ERROR') {
                return {
                    display: action.payload.display,
                    error: true
                }
            } 
            else if (action.payload.type === 'RESET') {
                return null
            }
            else {
                return state
            }
        }
    }
})

export const {createNotification} = notificationSlice.actions
export default notificationSlice.reducer