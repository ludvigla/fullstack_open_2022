import { useEffect, useState } from 'react';
import personService from './services/persons';
import "./App.css";
import Search from './components/Search';
import AddPerson from './components/AddPerson';
import RenderContacts from './components/RenderContacts';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [selectedPersons, setSelectedPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setSelectedPersons(initialPersons);
      });
  }, []);
 
  const addPerson = (event) => {
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
      name: newName,
      number: newNumber
    };
    const checkperson = persons.every(person => person.name !== newName);
    // Prevent updating phonebook if name already exists
    checkperson ? 
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)); 
        }) : 
      alert(`${newName} is already added to phonebook`);
    setNewName('');
    setNewNumber('');
  }

  // Update state variable holding the selected persons
  // This will override the search filter when a new person 
  // is added
  useEffect(() => {
    setSelectedPersons(persons);
  }, [persons]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const filtered = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setSelectedPersons(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <AddPerson 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <RenderContacts persons={selectedPersons} />
    </div>
  );
}

export default App
