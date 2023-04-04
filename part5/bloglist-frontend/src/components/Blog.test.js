import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('<Blog /> ', () => {
  let likeBlog
  let deleteBlog
  let blog
  let container

  beforeEach(() => {
    likeBlog = jest.fn()
    deleteBlog = jest.fn()

    blog = {
      author: 'test-author',
      title: 'test-title',
      likes: 'test-likes',
      url: 'test-url'
    }
    container = render(<Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>).container
  })

  test('renders title and author but not url or likes', async () => {
    expect(container).toHaveTextContent('test-title')
    expect(container).toHaveTextContent('test-author')
    expect(container).not.toHaveTextContent('test-url')
    expect(container).not.toHaveTextContent('test-likes')
  })

  test('renders url and likes after visibility has been toggled', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.viewDetailsButton')

    await user.click(button)

    expect(container).toHaveTextContent('test-title')
    expect(container).toHaveTextContent('test-author')
    expect(container).toHaveTextContent('test-url')
    expect(container).toHaveTextContent('test-likes')
  })

  test('Clicking like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.viewDetailsButton')

    await user.click(button)
    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})

