import { useState} from 'react'

const StatisticsLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	if (good !== 0 || neutral !== 0 || bad !== 0) {
		return (
			<>
				<h1>statistics</h1>
				<table>
					<tbody>
						<StatisticsLine text='good' value={good}/>
						<StatisticsLine text='neutral' value={neutral}/>
						<StatisticsLine text='bad' value={bad}/>
						<StatisticsLine text='All' value={good + neutral + bad}/>
						<StatisticsLine text='Average' value={(good * 1 + bad * -1)/ (good + neutral + bad)}/>
						<StatisticsLine text='Positive' value={good / (good + neutral + bad)}/>
					</tbody>
				</table>
			</>
		)
	} else {
		return (
			<>
				<h1>statistics</h1>
				<p>No feedback given.</p>
			</>
		)
	}
}

const Button = ({text, handleClick}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
		<h1>Give feedback</h1>
		<Button text='good' handleClick={incrementGood}/>
		<Button text='neutral' handleClick={incrementNeutral}/>
		<Button text='bad' handleClick={incrementBad}/>
		<Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
