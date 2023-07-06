import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import { NotificationContext } from './Notification'

const AnecdoteForm = () => {
	const [notificationState, notificationDispatch] = useContext(NotificationContext)
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes')
		},
		onError: () => {
			notificationDispatch({ type: "SHOW", content: "Too short anecdote, must have length 5 or more"})
		}
	})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
		console.log(typeof(notificationDispatch))
		notificationDispatch({type: "SHOW", content: `Added anecdote '${content}'`})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
