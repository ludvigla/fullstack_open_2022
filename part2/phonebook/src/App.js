import { useState } from 'react';
import "./App.css";
import Search from './components/Search';
import AddPerson from './components/AddPerson';
import RenderContacts from './components/RenderContacts';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 , important: true },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 , important: true  },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 , important: true  },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 , important: true  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
 
  const addNote = (event) => {
    event.preventDefault();
    // prevent storing empty names
    if (newName === '' || newNumber === '') {
      return
    };
    // prevent the usage characters other than numbers of hyphens
    if(!/^[0-9-]+$/.test(newNumber)){
      alert("Invalid characters in phone number.")
      return
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
      important: true
    };
    const checkperson = persons.every(person => person.name !== newName);
    // Prevent updating phonebook if name already exists
    checkperson ? 
      setPersons(persons.concat(personObject)) : 
      alert(`${newName} is already added to phonebook`);
    setNewName('');
    setNewNumber('');
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const copy = persons.map((person) => {
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
          ? (person.important = true)
          : (person.important = false)
        return person
      }
    );
    setPersons(copy);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <AddPerson 
        addNote={addNote}
        newName={newName}
        handleNoteChange={handleNoteChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <RenderContacts persons={persons} />
    </div>
  );
}

export default App
