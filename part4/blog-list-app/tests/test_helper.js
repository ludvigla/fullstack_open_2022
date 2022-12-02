const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog post 1',
    author: 'John Doe',
    url: 'https://www.example.com/blog/1',
    likes: 0,
    id: '63889dbc15e275b113ecbbbf',
  },
  {
    title: 'Blog post 2',
    author: 'Jane Doe',
    url: 'https://www.example.com/blog/2',
    likes: 0,
    id: '6388a1e8ad309991e3205f7c',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Will Remove', url: 'https://www.example.com/blog/remove', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}