import { useSelector } from "react-redux"
import { Alert } from "@mui/material"
const Notification = () => {
    const notification = useSelector(state => {
        if (!state.notifications) return null
        else return state.notifications
    })

    if (!notification) return null

    const severity = notification.error ? 'error' : 'success'
    return (
        <Alert severity={severity} >
            {notification.display}
        </Alert>
    )
}

export default Notification;