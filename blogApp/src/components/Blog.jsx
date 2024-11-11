import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, addBlogComment } from "../reducers/blogReducer";
import { Button, List, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
      dispatch(deleteBlog(blog))
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
      dispatch(addBlogComment(blog, {comment}))
} 

  return (
    <div className="blogContainer">
      <div>
        <h3>
          <span className="blogTitle">{blog.title}</span>{" "}
          <span style={{color: "coral"}} className="blogAuthor">{blog.author}</span>{" "}
        </h3>
      </div>
      <div>
        <div className="blogUrl"><a href={blog.url}>{blog.url}</a></div>
        <div style={{marginTop: 30, marginBottom: 30}} className="blogLikes">
          {blog.likes}
          <Button
            style={{marginLeft: 20}}
            color="secondary"
            variant="contained"
            className="blogLikeButton"
            onClick={() => handleLikeClick(blog)}
          >
            like
          </Button>
        </div>
        <div style={{marginBottom: 20}} className="LoggedInUser">{`Added by ${getName(blog)}`}</div>
        <div>
          {getLoggedInUser() === getUsername(blog) ? (
            <Button
              onClick={handleRemoveClick}
              color="secondary"
              variant="contained"
              startIcon={<Delete />}
            >
              remove
            </Button>
          ) : null}
        </div>
        <div>
          <h3>Comments</h3>
          <div style={{marginBottom: 30}}>
            <form onSubmit={handleAddComment}>
            <div style={{marginBottom: 15}}>
              <TextField label="comment" value={comment} onChange={({target}) => setComment(target.value)}/>
            </div>
            <Button color="secondary" type="submit">Add Comment</Button>
            </form>
          </div>
          {blog.comments 
            ? blog.comments.map(comment => (
              <List style={{marginLeft: 30}} key={comment}>{comment}</List>
          )
          )
        : null}
        </div>
        </div>
    </div>
  );
};
export default Blog;
