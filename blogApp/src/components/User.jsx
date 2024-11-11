import { List } from "@mui/material"
import { Link } from "react-router-dom"
const User = ({user}) => {
    if(!user) return null
    return (
        <div>
            <h3>{user.name}</h3>
            <h4>Added Blogs</h4>
            {user.blogs.map(blog => (
                <List key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </List>
            ))}
        </div>
    )
}

export default User