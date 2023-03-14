const Persons = (props) => {
	return (
		<>
			{props.persons.map(person =>
				<div key={person.id}>
					<p>
						{person.name} {person.number}
						<button onClick={() => props.handleDelete(person.id)} >delete</button> 
					</p>
				</div>
			)}
		</>
	)
}

export default Persons