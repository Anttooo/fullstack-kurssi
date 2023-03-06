import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/countries'

function App() {
	const [search, setSearch] = useState('')
	const [countries, setCountries] = useState([])

	const handleSearchChange = (event) => (setSearch(event.target.value))

	const filteredCountries = countries.filter((country) => 
		country.name.common.toLowerCase().startsWith(search.toLowerCase())
	)

	const getCountries = () => {
		axios
			.get("https://restcountries.com/v3.1/all")
			.then(response => {
				console.log("got the countries")
				setCountries(response.data)
			})
	}
	useEffect(getCountries, [])

	return (
    	<div>
			Find countries <input onChange={handleSearchChange}/>
			<Countries countries={filteredCountries}/>
    	</div>
	)
}

export default App
