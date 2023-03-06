import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

function App() {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterValue, setFilterValue] = useState('')
	const [notificationType, setNotificationType] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)

	const getPersons = () => {
		personServices
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}

	useEffect(getPersons, [])

	const handleNewNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNewNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handleFilterValueChange = (event) => {
		setFilterValue(event.target.value)
	}

	const filteredPersons = persons.filter((person) => 
		person.name.toLowerCase().startsWith(filterValue.toLowerCase())
	)

	const showSuccessNotification = (message) => {
		setNotificationType('success')
		setNotificationMessage(message)
		setTimeout(() => {
			setNotificationMessage(null)
			setNotificationType(null)
		}, 5000)
	}
	const showErrorNotification = (message) => {
		setNotificationType('error')
		setNotificationMessage(message)
		setTimeout(() => {
			setNotificationMessage(null)
			setNotificationType(null)
		}, 5000)
	}

	const deletePerson = (id) => {
		const person = persons.find(person => person.id === id)
		if (window.confirm(`Delete ${person.name}?`)) {
			personServices
				.deletePerson(id)
				.then(() => {
					setPersons(persons.filter(person => person.id !== id))
				})
		}
	}


	const addNewPerson = (event) => {
		event.preventDefault()

		const existingPerson = persons.find(person => person.name === newName)

		if (existingPerson) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const changedPerson = {...existingPerson, number: newNumber}
				personServices
					.updatePerson(existingPerson.id, changedPerson)
					.then(returnedPerson => {
						setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
						setNewName('')
						setNewNumber('')
						showSuccessNotification(`Updated number for ${returnedPerson.name}`)
					})
				.catch(error => {
					showErrorNotification(`Information of ${changedPerson.name} has already been removed from server`)
					setPersons(persons.filter(person => person.id !== changedPerson.id))
				})}
		} else {
			const newPersonObject = {
				name: newName,
				number: newNumber,
			}
			
			personServices
				.addNew(newPersonObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					showSuccessNotification(`Added ${returnedPerson.name}`)
			})
		}
	}

	return (
		<div className="container">
			<Notification message={notificationMessage} type={notificationType} />
			<h2> Phonebook </h2>
			<Filter value={filterValue} handleFilterValueChange={handleFilterValueChange}/>
			<h2> Add new</h2>
			<PersonForm 
				addNewPerson={addNewPerson}
				newName={newName}
				newNumber={newNumber}
				handleNewNumberChange={handleNewNumberChange}
				handleNewNameChange={handleNewNameChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPersons} handleDelete={deletePerson} />
		</div>
	)
}

export default App
