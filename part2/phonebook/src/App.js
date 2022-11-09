import { useState } from 'react';
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNote = (event) => {
    event.preventDefault();
    // prevent storing empty names
    if (newName === '') {
      return
    };
    const personObject = {
      name: newName
    };
    const checkperson = persons.every(person => person.name !== newName);
    // Prevent updating phonebook if name already exists
    checkperson ? 
      setPersons(persons.concat(personObject)) : 
      alert(`${newName} is already added to phonebook`);
    setNewName('');
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul className="no-bullets">
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
