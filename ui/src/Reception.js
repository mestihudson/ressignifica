import React from 'react'

import Api from '@/services/Api'

const Reception = (props) => {
  const [data, setData] = React.useState({
    name: ''
  })
  const [showMessage, setShowMessage] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const onChange = ({ target }) => {
    const after = { ...data, name: target.value }
    setData(after)
  }

  const onClick = () => {
    if (props.id !== undefined) {
      Api.updateReception(props.id, data)
        .then(() => {
          setShowMessage(true)
          setMessage('Reception successful updated.')
        })
    } else {
      Api.addReception(data)
        .then((response) => {
          const after = { ...data, ...response }
          setData(after)
          setShowMessage(true)
          setMessage('Reception successful created.')
        })
    }
  }

  React.useEffect(() => {
    if (props.id !== undefined) {
      Api.getReception(props.id)
        .then((data) => {
          setData(data)
        })
    }
  }, [props.id])

  return (
    <div>
      <input data-name='Name' onChange={onChange} value={data.name}/>
      <button data-trigger='Save' onClick={onClick}>Salvar</button>
      { showMessage && <span data-name='Notification'>{message}</span> }
    </div>
  )
}

export default Reception

