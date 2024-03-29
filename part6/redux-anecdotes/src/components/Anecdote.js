import { useDispatch } from "react-redux"
import { addVoteToAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  const voteForAnecdote = (id, content) => {
		console.log(id)
    dispatch(addVoteToAnecdote(id))
		dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div key={anecdote.id} className="bg-gray-50 rounded-lg shadow-md p-6 m-4 mb-4 flex justify-between flex-row">
        <div className="flex-col w-2/3">
          <p className="text-m font-mono text-gray-700">{anecdote.content}</p>
          <p className="text-s font-mono text-gray-500 pt-5">{anecdote.votes} votes</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10" onClick={() => voteForAnecdote(anecdote.id, anecdote.content)}>vote</button>
      </div>
  )
}

export default Anecdote