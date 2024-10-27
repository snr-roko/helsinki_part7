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

const handleLikeClick = async () => {
  const tokenStorage = window.localStorage.getItem('userLogin')
  const token = JSON.parse(tokenStorage).token
  blogService.setToken(token)
  const updateData = {...blog, likes: blog.likes + 1}
  const response = await blogService.update(updateData, updateData.id)
  const updatedBlogs = blogs.map(blog => blog.id === response.id ? response : blog)
  setBlogs(updatedBlogs)
}

const handleRemoveClick = async () => {
  const confirmResponse = window.confirm(`Remove ${blog.title} by ${blog.author}`)
  if (confirmResponse) {
    const tokenStorage = window.localStorage.getItem('userLogin')
    const token = JSON.parse(tokenStorage).token
    blogService.setToken(token)

    try {
      await blogService.deleteBlog(blog.id)
      const updatedBlogs = blogs.filter(aBlog => aBlog.id !== blog.id)
      setBlogs(updatedBlogs)
  } catch(error) {
    console.error(error)
  }
  }
  
}

const getName = (blog) => {
  try {
    return blog.user.name
  } catch(TypeError) {
    return "Unknown User"
  }
}

const getUsername = (blog) => {
  try {
    return blog.user.username
  } catch(TypeError) {
    return "Unknown Username"
  }
}

  return (

    <div className='blogContainer' style={blogStyle}>
      <div>
        <span className='blogTitle'>{blog.title}</span>{" "}<span className='blogAuthor'>{blog.author}</span>{" "}
        <button onClick={toggleShowAllInfo}>{showAllInfo ? 'Hide' : 'Show'}</button>
      </div>
      {showAllInfo
        ? <div>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>{blog.likes} <button onClick={handleLikeClick}>like</button></div>
          <div className='LoggedInUser'>{getName(blog)}</div>
          <div>
            {
              user.username === getUsername(blog) 
                ? <button onClick={handleRemoveClick} style={{color: "black", backgroundColor: "blue"}}>remove</button> 
                : null
            }
          </div>
        </div>
        : null
        }
       
  </div>
)}
export default Blog