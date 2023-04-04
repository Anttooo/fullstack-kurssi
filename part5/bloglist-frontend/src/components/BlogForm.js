import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
					title:<input
            type="text"
            value={title}
            name="Title"
            id="titleField"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
				author:<input
            type="text"
            value={author}
            name="Author"
            id="authorField"
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
				url:<input
            type="text"
            value={url}
            name="Url"
            id="urlField"
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button className="submitButton">create</button>
      </form>
    </>
  )
}

export default BlogForm
