import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, addBlogComment } from "../reducers/blogReducer";

const Blog = ({ blog, user, handleLikeClick }) => {
  if (!blog) {
    return null
  }

  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  
  const handleRemoveClick = async () => {
    const confirmResponse = window.confirm(
      `Remove ${blog.title} by ${blog.author}`,
    );
    if (confirmResponse) {
      try {
        dispatch(deleteBlog(blog))
      } catch (error) {
        dispatch({
          type: 'notifications/createNotification',
          payload: {
            display: error.error,
            type: 'ERROR'
          }
        })
      }
    }
  };

  const getName = (blog) => {
    try {
      return blog.user.name;
    } catch (TypeError) {
      return "Unknown User";
    }
  };

  const getUsername = (blog) => {
    try {
      return blog.user.username;
    } catch (TypeError) {
      return "Unknown Username";
    }
  };

  const getLoggedInUser = () => {
    if (user) {
      return user.username;
    } else {
      return "Unknown Username";
    }
  };

  const handleAddComment = () => {
    try {
      dispatch(addBlogComment(blog, {comment}))
      dispatch({
        type: "notifications/createNotification",
        payload: {
          type: 'SUCCESS',
          display: `Comment Added to ${blog.title}`
        }
      })
      setTimeout(() => {
        dispatch({
          type: "notifications/createNotification",
          payload: {
            type: 'RESET'
          }
        })
      }, 5000)
  } catch(error) {
    dispatch({
      type: "notifications/createNotification",
      payload: {
        type: 'ERROR',
        display: error.error
      }
    })
    setTimeout(() => {
      dispatch({
        type: "notifications/createNotification",
        payload: {
          type: 'RESET'
        }
      })
    }, 5000)
  }
} 

  return (
    <div className="blogContainer">
      <div>
        <h3>
          <span className="blogTitle">{blog.title}</span>{" "}
          <span className="blogAuthor">{blog.author}</span>{" "}
        </h3>
      </div>
      <div>
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">
          {blog.likes}{" "}
          <button
            className="blogLikeButton"
            onClick={() => handleLikeClick(blog)}
          >
            like
          </button>
        </div>
        <div className="LoggedInUser">{`Added by ${getName(blog)}`}</div>
        <div>
          {getLoggedInUser() === getUsername(blog) ? (
            <button
              onClick={handleRemoveClick}
              style={{ color: "black", backgroundColor: "blue" }}
            >
              remove
            </button>
          ) : null}
        </div>
        <div>
          <h3>Comments</h3>
          <div style={{marginBottom: 30}}>
            <form onSubmit={handleAddComment}>
            <input type="text" value={comment} onChange={({target}) => setComment(target.value)}/>
            <button type="submit">Add Comment</button>
            </form>
          </div>
          {blog.comments 
            ? blog.comments.map(comment => (
              <li style={{marginLeft: 30}} key={comment}>{comment}</li>
          )
          )
        : null}
        </div>
        </div>
    </div>
  );
};
export default Blog;
