import { useSelector } from "react-redux"
const Notification = () => {
    const notification = useSelector(state => {
        if (!state.notifications) return null
        else return state.notifications.display
    })
    return (
        <div>{notification}</div>
    )
}

export default Notification;