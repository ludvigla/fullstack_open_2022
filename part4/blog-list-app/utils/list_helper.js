const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const allLikes = blogs.map((blog) => blog.likes)
  const mostLikes = Math.max(...allLikes)
  const topRatedBlog = blogs.find((blog) => blog.likes === mostLikes)
  return typeof topRatedBlog === 'undefined'
    ? {}
    : {
      title: topRatedBlog.title,
      author: topRatedBlog.author,
      likes: topRatedBlog.likes,
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
