import axios from 'axios'
import { useEffect, useState } from 'react'

const Country = ({ country }) => {
	const [temp, setTemp] = useState('')
	const [wind, setWind] = useState('')
	const [weatherIcon, setWeatherIcon] = useState('')

	const api_key = import.meta.env.VITE_API_KEY
	const lat = country.capitalInfo.latlng[0]
	const lon = country.capitalInfo.latlng[1]
	const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`
	const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

	const getWeatherData = () => {
		axios
			.get(url)
			.then(response => {
				setTemp((response.data.current.temp -273.15).toFixed(2))
				setWind(response.data.current.wind_speed.toFixed(2))
				setWeatherIcon(response.data.current.weather[0].icon)
		})
	}

	useEffect(getWeatherData, [])

	return (
		<>
			<h1>{country.name.common}</h1>
			<p>capital: {country.capital}</p>
			<p>area: {country.area}</p>
			<h3>Languages:</h3>
			<ul>
				{Object.keys(country.languages).map((countryCode) => (
					<li key={country.languages[countryCode]}>{country.languages[countryCode]}</li>
				))}
			</ul>
			<img src={country.flags.png}/>
			<h3>Weather in {country.capital}</h3>
			<p>Temperature: {temp} celcius</p>
			<img src={weatherIconUrl}></img>
			<p>Wind: {wind} m/s</p>
		</>
	)
}

export default Country