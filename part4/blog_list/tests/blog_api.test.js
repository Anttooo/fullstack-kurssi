const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  // In initialBlogs we have an array of plain Javascript objects
  const blogObjects = helper.initialBlogs
    // On this line, each of those Javascript objects are transformed into mongoose models
    .map(blog => new Blog(blog))
  // A mongoose model has the method .save, which is used here to save each model into the db
  const promiseArray = blogObjects.map(blog => blog.save())
  // By storing the mapping of each blogObject into an array, it's possible to use Promise.all
  // which means that we're waiting for all of them to be fulfilled before continuing
  await Promise.all(promiseArray)
})

describe('API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('A new blog post can be added', async () => {
    const newBlog = {
      title: "test post",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/test-post.html",
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'test post'
    )
  })

  test('Blogs have id as identifier rather than _id', async () => {
    const blog = await Blog.findOne({title: 'Canonical string reduction'})
    expect(blog.id).toBeDefined()
  })

  test('Post without nr. of likes specified defaults likes to 0', async () => {
    const newBlog = {
      title: "test post without likes",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/test-post2.html"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogWithoutLikes = await Blog.findOne({title: 'test post without likes'})
    expect(blogWithoutLikes.likes).toBe(0)
  })

  test('Post with url missing is responded to with status 400', async () => {
    const blogWithoutUrl = {
      title: "test post without url",
      author: "Onni"
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })

  test('Post with title missing is responded to with status 400', async () => {
    const blogWithoutTitle = {
      url: "test post without url",
      author: "Onni"
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})