const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const user = await User.findOne({ id: body.userId })
  
  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    "user": user._id
  })


  if (body.title && body.url) {
    const savedBlog = await blog.save()
    console.log('test: ', savedBlog)

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log('in router, id to delete: ', request.params.id)
  const blogToDelete = await Blog.findByIdAndRemove(request.params.id)
  if (blogToDelete) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log('from router | request body: ', request.body)

  const blog = {
    title: body.title,
    author: body.title,
    url: body.url,
    likes: body.likes
  }

  console.log('from router | request.body.likes: ', body.likes)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response
    .json(updatedBlog)
    .status(200)
    .end()
})


module.exports = blogsRouter