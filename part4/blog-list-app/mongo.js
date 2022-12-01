const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.g2t0pxf.mongodb.net/blogApp?retryWrites=true&w=majority`

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const blog = new Blog({
      title: 'Blog post 2',
      author: "Jane Doe",
      url: "https://www.example.com/blog/2",
      likes: 0,
    })

    return blog.save()
  })
  .then(() => {
    console.log('blog post saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))