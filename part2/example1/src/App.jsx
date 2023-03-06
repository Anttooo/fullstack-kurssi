import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

function App() {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	
	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
		})
	}, [])

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		}

		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	const toggleImportance = (id) => {
		const note = notes.find(note => note.id === id)
		const changedNote = {...note, important: !note.important}

		noteService
			.update(id, changedNote)
			.then(returnedNote => { 
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(error => {
				alert(
					`the note '${note.content}' was already deletd from the server`
				)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	const notesToShow = showAll 
	? notes
	: notes.filter(note => note.important)



	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notesToShow.map(note => 
					<Note 
						key={note.id}
						note={note} 
						toggleImportance={() => toggleImportance(note.id)}/>
				)}
			</ul>
			<form onSubmit={addNote}>
				<input 
					value={newNote}
					onChange={handleNoteChange}	
				/>
				<button type="submit">save</button>
			</form>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					Show {showAll ? 'important' : 'all'}
				</button>
			</div>
		</div>
	)
}

export default App
