import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/blogForm";
import { useDispatch, useSelector } from "react-redux";
import Notification from './components/Notification'


const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()
  const blogFormRef = useRef();

  const blogs = useSelector(state => {
    if (!state.blogs) return null
    else return state.blogs
  })

  useEffect(() => {
    const localStorageCheck = window.localStorage.getItem("userLogin");
    if (localStorageCheck) {
      setUser(JSON.parse(localStorageCheck));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      dispatch({type: 'notifications/createNotification',
        payload: {
            display: "Username and Password Required",
            type: 'ERROR'
        }
     });
      setTimeout(() => {
        dispatch({
          type: 'notifications/createNotification',
          payload: {
            type: 'RESET'
          }
        })
      }, 5000);
      setUsername("");
      setPassword("");
      return;
    }
    try {
      const loggedInUser = await loginService({ username, password });
      setUser(loggedInUser);
      window.localStorage.setItem("userLogin", JSON.stringify(loggedInUser));
    } catch (error) {
      dispatch({
        type: 'notifications/createNotification',
        payload: {
          display: error.error,
          type: 'ERROR'
        }
      });
      setTimeout(() => {
        dispatch({
          type: 'notifications/createNotification',
          payload: {
            type: 'RESET'
          }
        })
      }, 5000);
    }
    setUsername("");
    setPassword("");
  };

  const handleLogOut = async () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const handleLikeClick = async (blog) => {
    const tokenStorage = window.localStorage.getItem("userLogin");
    const token = JSON.parse(tokenStorage).token;
    blogService.setToken(token);
    const updateData = { ...blog, likes: blog.likes + 1 };
    const response = await blogService.update(updateData, updateData.id);
    const updatedBlogs = blogs.map((blog) =>
      blog.id === response.id ? response : blog,
    );
    // setBlogs(updatedBlogs);
  };

  const createBlogs = async (newData) => {
    const newBlog = await blogService.create(newData);
    return newBlog;
  };

  const displayBlogs = () => {
    const sortedBlogs = [...blogs].sort(
      (blogOne, blogTwo) => blogTwo.likes - blogOne.likes,
    );
    return sortedBlogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        blogs={blogs}
        handleLikeClick={handleLikeClick}
      />
    ));
  };

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification />
        {user !== null && (
          <p>
            {`${user.name} logged in`}{" "}
            <button onClick={handleLogOut}>Log Out</button>
          </p>
        )}
      </div>
      <div>
        {user !== null && (
          <Togglable label="Click to add a new blog" ref={blogFormRef}>
            <BlogForm
              newBlog={createBlogs}
              blogFormRef={blogFormRef}
              blogs={blogs}
            />
          </Togglable>
        )}
        {user === null ? loginForm() : displayBlogs()}
      </div>
    </div>
  );
};

export default App;
