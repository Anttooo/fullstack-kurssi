import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationContext } from './components/Notification'
import { getAnecdotes, addVote } from './requests'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SHOW":
			return { visible: true, content: action.content }
		case "HIDE":
			return { visible: false, content: ''}
		default:
			return state
	}
}

const App = () => {
	const [notificationState, notificationDispatch] = useReducer(notificationReducer, { visible: false, content: ''})
	const queryClient = useQueryClient()

	const addVoteMutation = useMutation(addVote, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes')
		}
	})
	
	const handleVote = (anecdote) => {
		console.log()
    addVoteMutation.mutate(anecdote)
		notificationDispatch({type: "SHOW", content: `Anecdote '${anecdote.content}' was voted`})
  }
	

  const result = useQuery('anecdotes', getAnecdotes )

	if ( result.isLoading ) {
		return (<div>loading data...</div>)
	}

	if ( result.isError) {
		return (<div>Anecdote service not available due to problems in the server</div>)
	}

	const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notificationState, notificationDispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification state={notificationState} dispatch={notificationDispatch}/>
      <AnecdoteForm dispatch={notificationDispatch}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export default App
