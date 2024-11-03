const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map(person => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>

        </p>
      ))}
    </div>
  )
}

export default Persons
