import blogService from '../services/blogs'

import {useState} from 'react'
const Blog = ({ blog, user, setBlogs, blogs }) => {
const [showAllInfo, setShowAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const toggleShowAllInfo = () => {
  setShowAllInfo(!showAllInfo)
}

const handleLikesClick = async () => {
  const tokenStorage = window.localStorage.getItem('userLogin')
  const token = JSON.parse(tokenStorage).token
  blogService.setToken(token)
  const updateData = {...blog, likes: blog.likes + 1}
  const response = await blogService.update(updateData, updateData.id)
  const updatedBlogs = blogs.map(blog => blog.id === response.id ? response : blog)
  setBlogs(updatedBlogs)
}


  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleShowAllInfo}>{showAllInfo ? 'Hide' : 'Show'}</button>
      </div>
      {showAllInfo
        ? <div>
          <div>{blog.url}</div>
          <div>{blog.likes} <button onClick={handleLikesClick}>likes</button></div>
          <div>{user}</div>
        </div>
        : null
        }
       
  </div>
)}
export default Blog