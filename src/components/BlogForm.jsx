import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({
  blogFormRef,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const dispatch = useDispatch()

  const handleBlogForm = async (event) => {
    event.preventDefault();
    const newData = {
      title,
      author,
      url,
      likes,
    };

    try {
      dispatch(createBlog(newData))
      dispatch({
        type: 'notifications/createNotification',
        payload: {
          display: `A new Blog ${createdBlog.title} by ${createdBlog.author}`,
          type: 'SUCCESS'
        }
      }) 
      blogFormRef.current.toggleVisibility();
      setTimeout(() => {
        dispatch({
          type: 'notifications/createNotification',
          payload: {
            type:  'RESET'
          }
        })
      }, 5000);
    } catch (error) {
      dispatch({
        type: 'notifications/createNotification',
        payload: {
          display: error.error, 
          type: 'ERROR'
        }
      })
      setTimeout(() => {
        dispatch({
          type: 'notifications/createNotification',
          payload: {
            type: 'RESET'
          }
        })
      }, 5000);
    }
    setTitle("");
    setAuthor("");
    setLikes(0);
    setUrl("");
  };

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={handleBlogForm}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            placeholder="Blog Title"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            placeholder="Blog Author"
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            placeholder="Blog URL"
            type="url"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <label htmlFor="likes">Likes</label>
          <input
            placeholder="Blog Likes"
            type="number"
            name="likes"
            id="likes"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button className="newBlogSubmit" type="submit">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
