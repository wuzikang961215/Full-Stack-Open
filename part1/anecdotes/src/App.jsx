import { useState } from 'react'

// Header Component
const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

// Sentence Component
const Sentence = ({ sentence }) => {
  return <p><strong>{sentence}</strong></p>;
};

// Button Component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // Function to generate a random index for anecdotes
  const generateRandom = () => {
    const updatedSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(updatedSelected)
  }

  // Function to handle voting for the current anecdote
  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
  }

  // Find the anecdote with the most votes
  const maxVotes = Math.max(...votes)
  const mostVotedIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <Header title = 'Anecdote of the day' />
      <Sentence sentence = {anecdotes[selected]} />
      <Sentence sentence={`has ${votes[selected]} votes`} />
      <Button handleClick={voteAnecdote} text = 'vote'/>
      <Button handleClick={generateRandom} text = 'next anecdote'/>
      <Header title = 'Anecdote with most votes' />
      {maxVotes > 0 ? (
        <>
          <Sentence sentence={anecdotes[mostVotedIndex]} />
          <Sentence sentence={`has ${maxVotes} votes`} />
        </>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

export default App
