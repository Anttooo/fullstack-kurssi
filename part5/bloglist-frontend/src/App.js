import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = useRef()

  // Get all blogs for the user if user is defined
  useEffect(() => {
    if (user) {
      blogService
        .getAll(user.token)
        .then(blogs => setBlogs( blogs ))
    }
  }, [user])

  // check localstorage for token to see if the user has logged in
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // component for listing the blogs
  const blogList = () => (
    <div className='blogList'>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

  // Handle adding a blog post
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
      showSuccessNotification('new blog added')
    } catch(exception) {
      showErrorNotification('adding a blog failed. Please try again.')
    }
  }

  const likeBlog = (blogObject) => (
    blogService.likeBlog(blogObject, setBlogs)
  )

  const deleteBlog = (blogObject) => {
    if (window.confirm('Are you sure you want to delete the blog?')) {
      blogService.deleteBlog(blogObject, setBlogs)
    }
  }

  // Component including the fields for adding a component + the button
  const blogForm = () => (
    <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showSuccessNotification('login successful.')
    } catch(exception) {
      showErrorNotification('wrong username or password')
    }
  }

  const handleLogout = async() => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
    showSuccessNotification('logged out')
  }

  const loginForm = () => (
    <div className='loginForm'>
      <LoginForm
        handleLogin ={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </div>
  )

  const showSuccessNotification = (message) => {
    setNotificationType('success')
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }
  const showErrorNotification = (message) => {
    setNotificationType('error')
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        {blogList()}
        {blogForm()}
      </div>
      }
    </div>
  )
}

export default App