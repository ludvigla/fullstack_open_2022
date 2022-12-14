import { useEffect, useState } from 'react';
import personService from './services/persons';
import "./App.css";
import Search from './components/Search';
import AddPerson from './components/AddPerson';
import RenderContacts from './components/RenderContacts';
import Notification from './components/Notification';
import Error from './components/Error';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ selectedPersons, setSelectedPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errormessage, setErrormessage ] = useState(null)
  const [ currenttimeout, setCurrentTimeout ] = useState(null)

  const handleNotification = (message) => {
    setNotification(message)
    clearTimeout(currenttimeout)
    // Create a new timeout to clear the notification after 5 seconds
    // If a new contact is added, the timeout is reset
    setCurrentTimeout(
      setTimeout(() => {
        setNotification(null);
      }, 5000)
    );
  };

  const handleError = (message) => {
    setErrormessage(message)
    clearTimeout(currenttimeout)
    setCurrentTimeout(
      setTimeout(() => {
        setErrormessage(null);
      }, 5000)
    );
  };

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

    // check if the name already exists
    const checkperson = persons.find(person => person.name === newName);
    // check if number already exists
    //const checknumber = persons.find(person => person.number === newNumber);

    // Prevent updating phonebook if name already exists
    if (typeof checkperson === 'undefined') {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)); 
          handleNotification(`Added ${returnedPerson.name} to phonebook`);
        })
        .catch(error => {
          handleError(error.response.data.error);
        }) 
      } else {
        // check if number already exists, otherwise update phone number
        if (checkperson.number === newNumber) {
          alert(`${newName} is already added to phonebook with the given number`); 
        } else {
          personService
            .update(checkperson.id, {name: newName, number: newNumber})
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson)); 
              handleNotification(`Changed number for ${returnedPerson.name}`);
            })
            .catch(error => {
              console.log(error)
              if (error.response.status !== 400) {
                handleError(`Information of ${checkperson.name} has already been removed from server`)
                setPersons(persons.filter(n => n.id !== checkperson.id)) 
              } else {
                handleError(error.response.data.error)
              }
            })
        }
      }
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
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
      <Notification message={notification} />
      <Error message={errormessage} />
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
      <RenderContacts 
        persons={selectedPersons} 
        deletePerson={deletePerson}
      />
    </div>
  );
}

export default App
