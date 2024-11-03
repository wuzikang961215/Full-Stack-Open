const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input
            id="name"
            value={newName}
            onChange={handleNameChange}
            autoComplete="name"
          />
        </div>
        <div>
          number: <input
            id="number"
            value={newNumber}
            onChange={handleNumberChange}
            autoComplete="tel"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm
  