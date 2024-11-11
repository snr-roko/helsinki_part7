import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Button, TextField } from "@mui/material";
import { Save } from "@mui/icons-material";

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
      dispatch(createBlog(newData))
      blogFormRef.current.toggleVisibility();      
      setTitle("");
      setAuthor("");
      setLikes(0);
      setUrl("");
  }

  return (
    <div>
      <h3>Create New</h3>
      <form style={{display: "flex", flexDirection: "column", gap: 15}} onSubmit={handleBlogForm}>
        <div>
          <TextField
            placeholder="Blog Title"
            label="Title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            placeholder="Blog Author"
            label="Author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            placeholder="Blog URL"
            type="url"
            label="URL"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <TextField
            placeholder="Blog Likes"
            type="number"
            label="Likes"
            id="likes"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <Button style={{marginBottom: 15, width: 100}} className="newBlogSubmit" type="submit" variant="contained" color="secondary" startIcon={<Save />}>
          Create Blog
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
