const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Blog post 1",
    author: "John Doe",
    url: "https://www.example.com/blog/1",
    likes: 10,
  },
  {
    title: "Blog post 2",
    author: "Jane Doe",
    url: "https://www.example.com/blog/2",
    likes: 15,
  },
  {
    title: "Blog post 3",
    author: "Jane Doe",
    url: "https://www.example.com/blog/3",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "Will Remove",
    url: "https://www.example.com/blog/remove",
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
