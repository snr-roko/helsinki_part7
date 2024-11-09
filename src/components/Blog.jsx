import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog, user, setBlogs, blogs, handleLikeClick }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

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
      const tokenStorage = window.localStorage.getItem("userLogin");
      const token = JSON.parse(tokenStorage).token;
      blogService.setToken(token);

      try {
        await blogService.deleteBlog(blog.id);
        const updatedBlogs = blogs.filter((aBlog) => aBlog.id !== blog.id);
        setBlogs(updatedBlogs);
      } catch (error) {
        console.error(error);
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
