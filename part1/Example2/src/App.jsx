import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


const App = () => {
	const [ counter, setCounter ] = useState(0)

	const increaseByOne = () => setCounter(counter + 1)
	const decreaseByOne = () => setCounter(counter - 1)
	const setToZero = () => setCounter(0)

	return (
		<>
			<Display counter={counter} />
			<Button onClick={increaseByOne} text='Plus'/>
			<Button onClick={decreaseByOne} text='Minus'/>
			<Button onClick={setToZero} text='Zero'/>
		</>
	)
}

export default App
