import React from 'react'

import Api from '@/services/Api'

const Reception = () => {
  const [data, setData] = React.useState({
    name: ''
  })
  const [message, setMessage] = React.useState(false)

  const onChange = ({ target }) => {
    const after = { ...data, name: target.value }
    setData(after)
  }

  const onClick = () => {
    Api.addReception(data)
      .then((response) => {
        const after = { ...data, ...response }
        setData(after)
        setMessage(true)
      })
  }

  return (
    <div>
      <input data-name='Name' onChange={onChange}/>
      <button data-trigger='Save' onClick={onClick}>Salvar</button>
      {
        message &&
        <span data-name='Notification'
        >Reception successful created.</span>
      }
    </div>
  )
}

export default Reception

