import { useState } from 'react';

// Header Component
const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

// Button Component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

// Statistics Component for displaying all statistics or a "No feedback given" message in a table format
const Statistics = ({ good, neutral, bad, total, average, percentPos }) => {
  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>total</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average.toFixed(1)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{percentPos.toFixed(1)} %</td>
        </tr>
      </tbody>
    </table>
  );
};

// App Component
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentPos, setPercentPos] = useState(0);

  const goodClick = () => {
    const updatedGood = good + 1;
    const updatedTotal = updatedGood + neutral + bad;
    const updatedScore = score + 1;
    setGood(updatedGood);
    setTotal(updatedTotal);
    setScore(updatedScore);
    setAverage(updatedScore / updatedTotal);
    setPercentPos((updatedGood / updatedTotal) * 100);
  };

  const neutralClick = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotal = updatedNeutral + good + bad;
    setNeutral(updatedNeutral);
    setTotal(updatedTotal);
    setAverage(score / updatedTotal);
    setPercentPos((good / updatedTotal) * 100);
  };

  const badClick = () => {
    const updatedBad = bad + 1;
    const updatedTotal = updatedBad + good + neutral;
    const updatedScore = score - 1;
    setBad(updatedBad);
    setTotal(updatedTotal);
    setScore(updatedScore);
    setAverage(updatedScore / updatedTotal);
    setPercentPos((good / updatedTotal) * 100);
  };

  return (
    <div>
      <Header title='give feedback' />
      <Button handleClick={goodClick} text='good' />
      <Button handleClick={neutralClick} text='neutral' />
      <Button handleClick={badClick} text='bad' />
      <Header title='statistics' />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        average={average} 
        percentPos={percentPos} 
      />
    </div>
  );
};

export default App;
