import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


describe('<BlogForm /> ', () => {
  let createBlog
  let container

  beforeEach(() => {
    createBlog = jest.fn()
    container = render(<BlogForm createBlog={createBlog}/>).container
  })

  test('When called, blogform passes the right details forward', async () => {
    const submitButton = container.querySelector('.submitButton')
    const titleField = container.querySelector('#titleField')
    const authorField = container.querySelector('#authorField')
    const urlField = container.querySelector('#urlField')
    const user = userEvent.setup()

    await user.type(titleField, 'test-title')
    await user.type(authorField, 'test-author')
    await user.type(urlField, 'test-url')
    await user.click(submitButton)

    expect(createBlog.mock.calls[0][0].title).toBe('test-title')
    expect(createBlog.mock.calls[0][0].author).toBe('test-author')
    expect(createBlog.mock.calls[0][0].url).toBe('test-url')
  })
})

