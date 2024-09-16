import {useState} from 'react'
const Blog = ({ blog, user }) => {
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


  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleShowAllInfo}>{showAllInfo ? 'Hide' : 'Show'}</button>
      </div>
      {showAllInfo
        ? <div>
          <div>{blog.url}</div>
          <div>{blog.likes} <button>likes</button></div>
          <div>{user}</div>
        </div>
        : null
        }
       
  </div>
)}
export default Blog