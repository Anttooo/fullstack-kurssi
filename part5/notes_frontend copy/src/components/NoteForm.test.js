import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  // mock function used instead of createNote
  const createNote = jest.fn()
  // sets up capability for using userEvents, user.type and user.click are used in the code
  const user = userEvent.setup()

  // Here a NoteForm component is rendered and the mock function is given to it as createNote
  render(<NoteForm createNote={createNote} />)

  // the textbox element is stored in the input variable
  const input = screen.getByPlaceholderText('write note content here')
  // the button with text 'save' is stored in sendButton
  const sendButton = screen.getByText('save')

  // To use the type userEvent, it takes first the element where typing should be done to and then the text
  await user.type(input, 'testing a form...')
  // Clicking just requires a clickable element
  await user.click(sendButton)

  // Mock function has been called once
  expect(createNote.mock.calls).toHaveLength(1)
  // In mock call[0][0] there is content which was typed to the input field
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

