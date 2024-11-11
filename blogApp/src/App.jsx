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
import { Container, Table, TableBody, TableCell, TableRow, TableContainer, Paper, TextField, Button, AppBar, Toolbar } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";

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
    dispatch(loginUser({username, password}))
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
            <TextField
              label="Username"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
        <div>
          <TextField
            style={{marginTop: 10}}
            type="password"
            label="Password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button startIcon={<Login />} style={{marginTop: 10}} type="submit" variant="contained" color="primary">Login</Button>
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


  const DisplayBlogs = () => {
    const sortedBlogs = [...blogs].sort(
      (blogOne, blogTwo) => blogTwo.likes - blogOne.likes,
    );

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            )
          )
        }
        </TableBody>
            </Table>
      </TableContainer>
    )    
  };

  return (
      <Container>
        <div>

              {user !== null && (
                  <AppBar position="static">
                    <Toolbar style={{display: "flex", gap: 40, justifyContent: "center", alignItems: "center"}}>                    
                      <Button color="white" component={Link} to="/">Blogs</Button>
                      <Button color="white" component={Link} to="/users">Users</Button>
                      <div>{`${user.name} logged in`}</div>
                      <Button color="white" startIcon={<Logout/>} onClick={handleLogOut}>Log Out</Button>
                    </Toolbar>
                  </AppBar>                    
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
              {user === null ? loginForm() : <DisplayBlogs />}
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
      </Container>
  );
};

export default App;
