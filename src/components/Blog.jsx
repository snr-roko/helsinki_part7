import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user, handleLikeClick }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShowAllInfo = () => {
    setShowAllInfo(!showAllInfo);
  };

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

  return (
    <div className="blogContainer" style={blogStyle}>
      <div>
        <span className="blogTitle">{blog.title}</span>{" "}
        <span className="blogAuthor">{blog.author}</span>{" "}
        <button className="toggleView" onClick={toggleShowAllInfo}>
          {showAllInfo ? "Hide" : "Show"}
        </button>
      </div>
      {showAllInfo ? (
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
          <div className="LoggedInUser">{getName(blog)}</div>
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
        </div>
      ) : null}
    </div>
  );
};
export default Blog;
