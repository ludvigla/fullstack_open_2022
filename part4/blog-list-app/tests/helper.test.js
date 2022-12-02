const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when blog list is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list only has one blog post', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blog posts', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbbf',
        title: 'Blog Post',
        author: 'John Doe',
        url: 'www.example.com/post1',
        likes: 10,
        __v: 0,
      }
    ]

    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(15)
  })

})

describe('most liked blog', () => {

  test('when blog list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list only has one blog post', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has multiple blog posts', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbbf',
        title: 'Blog Post',
        author: 'John Doe',
        url: 'www.example.com/post1',
        likes: 10,
        __v: 0,
      }
    ]

    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual({
      title: 'Blog Post',
      author: 'John Doe',
      likes: 10,
    })
  })

  test('when list has multiple blog posts with ties', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbbf',
        title: 'Blog Post',
        author: 'John Doe',
        url: 'www.example.com/post1',
        likes: 10,
        __v: 0,
      }
    ]

    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 10,
    })
  })

})

// Test for most blogs
describe('most blogs', () => {

  test('when blog list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list only has one blog post', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('when list has multiple blog posts', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbbf',
        title: 'Blog Post 1',
        author: 'John Doe',
        url: 'www.example.com/post1',
        likes: 10,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbss',
        title: 'Blog Post 2',
        author: 'John Doe',
        url: 'www.example.com/post2',
        likes: 20,
        __v: 0,
      }
    ]

    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual({
      author: 'John Doe',
      blogs: 2,
    })
  })

  test('when list has multiple blog posts with ties', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbbf',
        title: 'Blog Post',
        author: 'John Doe',
        url: 'www.example.com/post1',
        likes: 10,
        __v: 0,
      }
    ]

    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

})

// Test for most likes

describe('most likes', () => {

  test('when blog list is empty', () => {

    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list only has one blog post', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has multiple blog posts', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbbf',
        title: 'Blog Post 1',
        author: 'John Doe',
        url: 'www.example.com/post1',
        likes: 10,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbss',
        title: 'Blog Post 2',
        author: 'John Doe',
        url: 'www.example.com/post2',
        likes: 20,
        __v: 0,
      }
    ]

    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual({
      author: 'John Doe',
      likes: 30,
    })
  })

  test('when list has multiple blog posts with ties', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0,
      },
      {
        _id: '63889dbc15e275b113ecbbbf',
        title: 'Blog Post',
        author: 'John Doe',
        url: 'www.example.com/post1',
        likes: 10,
        __v: 0,
      }
    ]

    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 10
    })
  })

})