import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

function getAnecdotes(dispatch) {
  anecdoteService
    .getAll()
    .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
}

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {getAnecdotes(dispatch)}, [dispatch])

  return (
    <div>
      <h2 className="m-4 text-3xl font-bold">Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App