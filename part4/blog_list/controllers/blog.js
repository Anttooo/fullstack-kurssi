const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (request.body.title && request.body.url) {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter