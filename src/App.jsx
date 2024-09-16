import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
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
      <Blog key={blog.id} blog={blog} />
    )
  }

  const handleBlogForm = async (event) => {
    event.preventDefault()
    const newData = {
      title,
      author,
      url,
      likes
    }

    const userStorage = window.localStorage.getItem('userLogin')
    const tokenStorage = JSON.parse(userStorage).token

    blogService.setToken(tokenStorage)
    try {
      const createdBlog = await blogService.create(newData)
      setBlogs([...blogs, createdBlog])
      setSuccessfulMessage(`A new Blog ${createdBlog.title} by ${createdBlog.author}`)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setSuccessfulMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setLikes(0)
    setUrl('')
  }

  const blogForm = () => {
    return (
      <div>
        <h3>Create New</h3>
        <form onSubmit={handleBlogForm}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type='text' name='title' id='title' value={title} onChange={({target}) => setTitle(target.value)} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type='text' name='author' id='author' value={author} onChange={({target}) => setAuthor(target.value)} />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input type='url' name='url' id='url' value={url} onChange={({target}) => setUrl(target.value)} />
          </div>
          <div>
            <label htmlFor="likes">Likes</label>
            <input type='number' name='likes' id='likes' value={likes} onChange={({target}) => setLikes(target.value)} />
          </div>
          <button type='submit'>Create Blog</button>
        </form>
      </div>
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
          && <Togglable label='Click to add a new blog' ref={blogFormRef}>
                {blogForm()}
          </Togglable>
          }
        {user === null ? loginForm() : displayBlogs()}
      </div>
    </div>
  )
}

export default App