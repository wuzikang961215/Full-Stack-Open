import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='alert'>
        {message}
      </div>
    )
  }


  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already in the phonebook, replace the old number with the new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setAlertMessage(`Updated ${returnedPerson.name}'s number`)
            setTimeout(() => {
            setAlertMessage(null)
            }, 5000) // Clear alert after 5 seconds
          })
          .catch(error => {
            setAlertMessage(`Information of ${existingPerson.name} has already been removed from server`)
            setTimeout(() => {
              setAlertMessage(null)
            }, 5000) // Clear alert after 5 seconds
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setAlertMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000) // Clear alert after 5 seconds
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = id => {
    const personToRemove = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = searchTerm
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={alertMessage} />

      <Filter 
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App
