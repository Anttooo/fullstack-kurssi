import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => axios.post(baseUrl, newAnecdote).then(res => res.data)

export const addVote = votedAnecdote => {
	console.log("Hi from add vote!")
	console.log("Voted anecdote has id: " + votedAnecdote.id)
	return axios.put(`${baseUrl}/${votedAnecdote.id}`, {...votedAnecdote, votes: votedAnecdote.votes + 1}).then(res => res.data)
}