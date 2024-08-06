import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    try { 
      const loggedInUser = await loginService({username, password})
      setUser(loggedInUser)
      window.localStorage.setItem('userLogin', JSON.stringify(loggedInUser))
    } catch (Exception) {
      alert("Wrong Credentials")
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

  return (
    <div>
      <h2>blogs</h2>
      {user !== null && <p>{`${user.name} logged in`} <button onClick={handleLogOut}>Log Out</button></p>}
      {user === null ? loginForm() : displayBlogs()}
    </div>
  )
}

export default App