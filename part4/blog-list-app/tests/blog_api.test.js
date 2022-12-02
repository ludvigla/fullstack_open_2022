const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blog api test', () => {

  // Check format of returned blogs
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // Check that all blogs are returned
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  // Check that a specific blog is within the returned blogs
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'Blog post 1'
    )
  })

  // test adding a new blog post
  // solution to exercise 4.10, step3
  test('a valid blog post can be added', async () => {
    const newBlog = {
      title: 'Blog post 3',
      author: 'Jane Doe',
      url: 'https://www.example.com/blog/3',
      likes: 100,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Blog post 3')
  })

  // Test adding an empty blog post
  test('blog without title, author, url or likes is not added', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  // Test viewing a specific blog post
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  // Test deleting a blog post
  // Solution to exercise 4.13, step1
  test('a blog post can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).not.toContain(blogToDelete.content)
  })

  // verify that a property named id exists
  test('verify that a property named id exists', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
    expect(response.body[2].id).toBeDefined()
  })

  // Test that the likes property has a default value of 0
  test('verify 0 likes', async () => {
    const response = await api.get('/api/blogs')

    const postWithNoLikes = response.body.find(blog => blog.title === 'Blog post 3')
    expect(postWithNoLikes.likes).toBe(0)
  })

  // test adding a new blog post with missing url or title
  // solution to exercise 4.12*, step5
  test('an invalid blog post is rejected', async () => {
    const newBlogMissingTitle = {
      author: 'Jane Doe',
      url: 'https://www.example.com/blog/4',
      likes: 42,
    }
    const newBlogMissingURL = {
      author: 'Jane Doe',
      url: 'https://www.example.com/blog/4',
      likes: 42,
    }

    await api
      .post('/api/blogs')
      .send(newBlogMissingTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBlogMissingURL)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  // Test updating a blog post
  test('a blog post can be updated', async () => {

    const initresponse = await api.get('/api/blogs')
    const blogsAtStart = initresponse.body

    const updatedPost = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: 20,
    }

    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(updatedPost)
      .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

})

// Users API tests
describe('users api tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'superuser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jdoe',
      name: 'John Doe',
      password: 'jdoe123',
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

  test('invalid users are not permitted', async () => {

    const usersAtStart = await helper.usersInDb()

    // Test invalid username
    const invalidUser1 = {
      username: 'Al',
      password: '12345678'
    }

    await api
      .post('/api/users')
      .send(invalidUser1)
      .expect(400)

    // Test invalid password
    const invalidUser2 = {
      username: 'John Doe',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(invalidUser2)
      .expect(400)

    // Test non-unique username
    const invalidUser3 = {
      username: 'root',
      password: '12345678'
    }

    await api
      .post('/api/users')
      .send(invalidUser3)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})