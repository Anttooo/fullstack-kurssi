const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { decode } = require('punycode')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(request.user.id)
  
  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    "user": user._id
  })


  if (body.title && body.url) {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)
	const correctUser = (blogToDelete.user.toString() === user.id.toString())
  if (blogToDelete && correctUser) {
    response.status(204).end()
  } else {
    response.status(401).json({
			error: 'No rights to delete this post with this user id'
		})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response
    .json(updatedBlog)
    .status(200)
    .end()
})


module.exports = blogsRouter