const lodash = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const allLikes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...allLikes);
  const topRatedBlog = blogs.find((blog) => blog.likes === mostLikes);
  return typeof topRatedBlog === "undefined"
    ? {}
    : {
        title: topRatedBlog.title,
        author: topRatedBlog.author,
        likes: topRatedBlog.likes,
      };
};

const mostBlogs = (blogs) => {
  const countsByName = lodash
    ._(blogs)
    .groupBy("author")
    .map((items, name) => ({ name, count: items.length }))
    .value();
  const allCounts = countsByName.map((author) => author.count);
  const mostBlogs = Math.max(...allCounts);
  const topAuthor = countsByName.find((author) => author.count === mostBlogs);
  return typeof topAuthor === "undefined"
    ? {}
    : {
        author: topAuthor.name,
        blogs: topAuthor.count,
      };
};

const mostLikes = (blogs) => {
  const likesByName = lodash
    ._(blogs)
    .groupBy("author")
    .map((items, name) => ({
      name,
      totallikes: lodash._.sumBy(items, "likes"),
    }))
    .value();
  const allLikes = likesByName.map((author) => author.totallikes);
  const mostLikes = Math.max(...allLikes);
  const topAuthor = likesByName.find(
    (author) => author.totallikes === mostLikes
  );
  return typeof topAuthor === "undefined"
    ? {}
    : {
        author: topAuthor.name,
        likes: topAuthor.totallikes,
      };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
