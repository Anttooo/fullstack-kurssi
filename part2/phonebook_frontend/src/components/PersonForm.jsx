const PersonForm = (props) => {
	return(
		<form onSubmit={props.addNewPerson}>
			<div className="inputField">
				name:
				<input 
					value={props.newName}
					onChange={props.handleNewNameChange}
				/>
			</div>
			<div className="inputField">
				number: 
				<input 
					value={props.newNumber}
					onChange={props.handleNewNumberChange}
				/>
			</div>
			<div>
				<button type="submit"> add </button>
			</div>
		</form>
	)
}

export default PersonForm