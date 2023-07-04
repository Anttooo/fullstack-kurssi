import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
	const anecdoteUrl = `${baseUrl}/${id}`
	const response = await axios.get(anecdoteUrl)
	const anecdote = response.data

	const updatedAnecdote = {
		...anecdote,
		votes: anecdote.votes + 1,
	}

	const updateResponse = await axios.put(anecdoteUrl, updatedAnecdote)
	return updateResponse.data
}

export default { getAll, createNew, addVote }