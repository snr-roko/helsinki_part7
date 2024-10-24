import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/blogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const localStorageCheck = window.localStorage.getItem('userLogin')
    if (localStorageCheck) {
      setUser(JSON.parse(localStorageCheck))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      setErrorMessage("Username and Password Required")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
      return
    } 
    try { 
      const loggedInUser = await loginService({username, password})
      setUser(loggedInUser)
      window.localStorage.setItem('userLogin', JSON.stringify(loggedInUser))
    } catch (error) {
      setErrorMessage(error.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setUsername('')
    setPassword('')
  }

  const handleLogOut = async () => {
    window.localStorage.clear()
    setUser(null)
  }
  

  const loginForm = () => {
    return <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" >Username</label>
                <input type='text' name="username" id='username' value={username} onChange={({target}) => setUsername(target.value)}></input>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={({target}) => setPassword(target.value)} />
              </div>
              <button type="submit">Login</button>
            </form>
  }

  const displayBlogs = () => {
    return blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user.name} setBlogs={setBlogs} blogs={blogs} />
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        {errorMessage}
        {successfulMessage}
        {user !== null && <p>{`${user.name} logged in`} <button onClick={handleLogOut}>Log Out</button></p>}
      </div>
      <div>
        {user !== null
          && 
          <Togglable label='Click to add a new blog' ref={blogFormRef}>
               <BlogForm blogFormRef={blogFormRef} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} setSuccessfulMessage={setSuccessfulMessage} />
          </Togglable>
          }
        {user === null ? loginForm() : displayBlogs()}
      </div>
    </div>
  )
}

export default App