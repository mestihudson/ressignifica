import React from 'react';
import './App.css';

import axios from 'axios'

const Line = ({ id, name, onRemove }) => {
  const onClick = () => {
    onRemove(id)
  }

  return <li data-name='Line'>
    <span data-name='Content'>{name}</span>
    <button data-trigger='Remove' data-id={id} onClick={onClick}>Remove</button>
  </li>
}

const Lines = ({ assisteds, onRemove }) =>
  <ul>
    {
      assisteds
        .map(({ id, name }) => <Line key={id} id={id} name={name} onRemove={onRemove}/>)
    }
  </ul>

const App = () => {
  const [assisteds, setAssisteds] = React.useState([])
  React.useEffect(() => {
    axios.get(`/api/assisteds`)
      .then((response) => {
        setAssisteds(response.data)
      })
  }, [])
  const onLineRemove = (id) => {
    axios.delete(`/api/reception/${id}`)
      .then(() => {
        const after = assisteds.filter((assisted) => assisted.id !== id)
        setAssisteds(after)
        console.log(`Reception ${id} successful removed.`)
      })
      .catch(() => console.error(`Reception ${id} not removed.`))
  }
  return (
    <div className="App">
      <ul><Lines assisteds={assisteds} onRemove={onLineRemove}/></ul>
    </div>
  );
}

export default App;
