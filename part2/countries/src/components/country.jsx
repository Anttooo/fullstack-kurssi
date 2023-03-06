const Country = ({ country }) => {
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
		</>
	)
}

export default Country