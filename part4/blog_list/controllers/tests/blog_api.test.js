const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const { initial } = require('lodash')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = async (id) => {
	const userForToken = {
		username: 'blogger',
		id: id,
	}
	const token = jwt.sign(userForToken, process.env.SECRET)
	return token
}

let token

beforeAll(async () => {
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('salasana', 10)
	const user = new User({username: 'testUser', passwordHash})

	await user.save()
	const blogger = await User.findOne({username: 'testUser'})
	token = await getToken(blogger.id)
})

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
			.set('Authorization', `bearer ${token}`)
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
			.set('Authorization', `bearer ${token}`)
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
			.set('Authorization', `bearer ${token}`)
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
			.set('Authorization', `bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
		const newBlog = {
			title: "test post",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/test-post.html",
      likes: 2,
    }
		
    await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
		
		// here it should specify that it's deleting a blog by blogger
		const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart.find(blog => blog.title === "test post")

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe ('modifying a blog', () => {
  test('the number of likes can be increased', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const likesAtStart = blogToModify.likes

    const blogWithIncreasedLikes = {
      ...blogToModify,
      likes: blogToModify.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogWithIncreasedLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const likesAtEnd = blogsAtEnd[0].likes
    
    expect(likesAtEnd).toBe(likesAtStart + 1)
  })

  test('the number of likes can be decreased', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const likesAtStart = blogToModify.likes

    const blogWithDecreasedLikes = {
      ...blogToModify,
      likes: blogToModify.likes - 1
    }

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogWithDecreasedLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const likesAtEnd = blogsAtEnd[0].likes
    
    expect(likesAtEnd).toBe(likesAtStart - 1)
  })
})

describe('User-handling', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'onni',
      name: 'Onni Anttoora',
      password: 'salasana'
    }
    
    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('correct error code returned for duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Onni Anttoora',
      password: 'salasana'
    }
    
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('Too short username results correct error code', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'On',
      name: 'Onni Anttoora',
      password: 'salasana'
    }
    
    await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
    .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('Too short password results correct error code', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Onni',
      name: 'Onni Anttoora',
      password: 'ro'
    }
    
    await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
    .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})