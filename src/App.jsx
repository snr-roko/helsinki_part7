import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/blogForm";
import { useDispatch, useSelector } from "react-redux";
import Notification from './components/Notification'
import { likeBlog } from "./reducers/blogReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";
import { Routes, Route, Navigate, useMatch, Link } from "react-router-dom";
import Users from "./components/Users";
import User from './components/User'


const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const blogFormRef = useRef();

  const blogs = useSelector(state => state.blogs)

  const blogMatch = useMatch('/blogs/:id')
  let blog
  if (blogMatch) {blog = blogs.find(eachBlog => eachBlog.id === blogMatch.params.id)}

  const user = useSelector(state => state.user)
  
  const users = useSelector(state => state.users)
  
  const match = useMatch('/users/:id')
  let blogUser

  if (match) {blogUser = users.find(user => user.id === match.params.id)}
  
  const handleLogin = (event) => {
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
      dispatch(loginUser({username, password}))
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

  const handleLogOut = () => {
    dispatch(logoutUser())
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
    const updateData = { ...blog, likes: blog.likes + 1 };
    dispatch(likeBlog(updateData))
    dispatch({
      type: 'notifications/createNotification',
      payload: {
        display: `blog ${blog.title} by ${blog.author} liked`,
        type: 'SUCCESS'
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'notifications/createNotification',
        payload: {
          type: 'RESET'
        }
      })
    }, 5000)
  };


  const displayBlogs = () => {
    const sortedBlogs = [...blogs].sort(
      (blogOne, blogTwo) => blogTwo.likes - blogOne.likes,
    );
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
    }
    return sortedBlogs.map((blog) => (
      <div key={blog.id} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    ));
  };

  return (
      <div>
        {user !== null && (
            <div style={{backgroundColor: "#e2e8f0"}}>
              <Link to="/">Blogs</Link>{" "}
              <Link to="/users">Users</Link>{" "}
              {`${user.name} logged in`}{" "}
              <button onClick={handleLogOut}>Log Out</button>
            </div>
        )}
        <div>
          <h2>Blog App</h2>
          <Notification />
        </div>
        <Routes>
          <Route path="/" element={
            <div>
            {user !== null && (
              <Togglable label="Click to add a new blog" ref={blogFormRef}>
                <BlogForm
                  blogFormRef={blogFormRef}
                  blogs={blogs}
                />
              </Togglable>
            )}
            {user === null ? loginForm() : displayBlogs()}
          </div>
          }/>
          <Route path="/blogs/:id" element={ 
            user ?  <Blog
                      blog={blog}
                      user={user}
                      blogs={blogs}
                      handleLikeClick={handleLikeClick}
                    />
                    : <Navigate replace to="/" />
          } />
          <Route path="/users" element={
            user ? <Users users={users} /> : <Navigate replace to="/" />
          }/>
          <Route path="/users/:id" element={
            user ? <User user={blogUser} /> : <Navigate replace to="/" />
          } />
        </Routes>
      </div>
  );
};

export default App;
