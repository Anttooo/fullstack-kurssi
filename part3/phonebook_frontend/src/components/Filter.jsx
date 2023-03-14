const Filter = ({filterValue, handleFilterValueChange}) => {
	return (
		<form >
			<div>
				filter shown with:
				<input
					value={filterValue}
					onChange={handleFilterValueChange}
				/>
			</div>
		</form>
	)
}

export default Filter