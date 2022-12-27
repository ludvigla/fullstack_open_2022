import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

// Right, now the test complains about missing
describe('<Blog />', () => {

  test('renders content', () => {
    const blog = {
      title: 'Blog post',
      author: 'John Doe',
      user: '63a58e20ba69481de60d6dc6',
    }

    const { container } = render(<Blog blog={blog} user={{}} prop={jest.fn()} removeBlog={jest.fn()} addLike={jest.fn()}/>)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Blog post John Doe')
  })

  test('at the start, extended info (url and likes) is not shown', () => {
    const blog = {
      title: 'Blog post',
      author: 'John Doe',
      user: '63a58e20ba69481de60d6dc6',
    }

    const { container } = render(<Blog blog={blog} user={{}} prop={jest.fn()} removeBlog={jest.fn()} addLike={jest.fn()}/>)

    const div = container.querySelector('.extendedInfo')
    expect(div).toBeNull()
  })

})