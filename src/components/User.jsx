const User = ({user}) => {
    if(!user) return null
    return (
        <div>
            <h3>{user.name}</h3>
            <h4>Added Blogs</h4>
            {user.blogs.map(blog => (
                <li key={blog.id}>
                    {blog.title}
                </li>
            ))}
        </div>
    )
}

export default User