import React from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'

const Line = ({ name }) => {
  return <li data-name='Line'>{name}</li>
}

const Lines = ({ assisteds }) => {
    return <ul>{assisteds.map(({ id, name }) => <Line key={id} name={name}/>)}</ul>
}

const App = () => {
  const [assisteds, setAssisteds] = React.useState([])
  React.useEffect(() => {
    axios.get(`/api/assisteds`)
      .then((response) => {
        setAssisteds(response.data)
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ul><Lines assisteds={assisteds}/></ul>
    </div>
  );
}

export default App;
