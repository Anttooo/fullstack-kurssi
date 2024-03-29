import Country from './country'

const countries = ({countries, handleClick}) => {
	console.log("in countries...")

	if (countries.length == 0) {
		return null
	}
	else if (countries.length == 1) {
		console.log(countries)
		return (
			<Country country={countries[0]} />
		)
	} else {
		if (countries.length > 10) {
			return (
				<p>too many countries to show...</p>
			)
		} else {
			return (
				<>
					{countries.map(country =>
						<>
							<p key={country.name.common}>
								{country.name.common}
								<button onClick={() => handleClick(country.name.common)}>Show info</button>
							</p>
							
						</>
					)}
				</>
			)
	}}
}

export default countries