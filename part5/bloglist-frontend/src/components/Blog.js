import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => (
    setShowDetails(!showDetails)
  )

  const blogDetails = () => (
    <div>
      <p>{blog.url}</p>
      <p>
        {blog.likes}
        <button className='likeButton' onClick={() => likeBlog(blog)}>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={() => deleteBlog(blog)}>remove</button>
    </div>
  )

  return (
    <div className="blogWrapper">
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className='viewDetailsButton'>view</button>
      </div>
      <div>
        {showDetails && blogDetails()}
      </div>
    </div>
  )
}

export default Blog