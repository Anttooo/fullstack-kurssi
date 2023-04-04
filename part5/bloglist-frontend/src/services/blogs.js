import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.get(baseUrl, config)
  response.data.sort((a,b) => b.likes - a.likes)
  return response.data
}

const likeBlog = async (likedBlog, setBlogs) => {
  if (likedBlog) {
    const url = `${baseUrl}/${likedBlog.id}`
    const config = {
      headers: {
        Authorization: token
      }
    }
    const updatedBlog = {
      author: likedBlog.author,
      title: likedBlog.title,
      url: likedBlog.url,
      likes: likedBlog.likes + 1
    }
    const response = await axios.put(url, updatedBlog, config)
    setBlogs(blogs => blogs.map(blog => blog.id !== likedBlog.id ? blog : response.data))
    return response.data
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (deletedBlog, setBlogs) => {
  const url = `${baseUrl}/${deletedBlog.id}`
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(url, config)
  setBlogs(blogs => blogs.filter(blog => blog.id !== deletedBlog.id))
  return response.data
}

export default { getAll, setToken, create, likeBlog, deleteBlog }