import { useState } from 'react'

const Button = ({text, handleClick}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const TopAnecdote = ({points, anecdotes}) => {
	let isNotBlank = 0
	for (var i = 0; i < points.length; i++) {
		if (points[i] != 0)
			isNotBlank = 1
	}
	if (isNotBlank) {
		function getMaxIndex(points) {	
			var max = points[0];
			var maxIndex = 0;
		
			for (var i = 1; i < points.length; i++) {
				if (points[i] > max) {
					maxIndex = i;
					max = points[i];
				}
			}
		
			return maxIndex;
		}
		let maxIndex = getMaxIndex(points)
		console.log(maxIndex)
	
		var topPoints = points[maxIndex]
		var topAnecdote = anecdotes[maxIndex]
		return (
			<>
				<h1>Anecdote with most votes</h1>
				<p>{topAnecdote}</p>
				<p>Has {topPoints} votes</p>
			</>
		)
	} else {
		return (
			<p>No votes have been given</p>
		)
	}

}

function App() {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	]
	const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
	const [selected, setSelected] = useState(0)

	const incrementVotes = () => {
		const copy = [...points]
		copy[selected] += 1
		setPoints(copy)
	}

	return (
		<div>
			<p>{anecdotes[selected]}</p>
			<p>Has {points[selected]} votes</p>
			<Button text='vote' handleClick={incrementVotes} />
			<Button text='generate random' handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}/>
			<TopAnecdote anecdotes={anecdotes} points={points}/>
		</div>
	)
}

export default App
