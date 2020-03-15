import React from 'react'

import Api from '@/services/Api'

const Remove = ({ id, onRemove }) => {
  const onClick = () => {
    onRemove(id)
  }
  return <button data-trigger='Remove' data-id={id} onClick={onClick}
  >Remover</button>
}

const Receptions = () => {
  const [items, setItems] = React.useState([])
  React.useEffect(() => {
    Api.loadReceptions()
      .then((response) => {
        setItems(response)
      })
  }, [])
  const onLineRemove = (id) => {
    Api.removeReception(id)
      .then(() => {
        const after = items.filter((item) => item.id !== id)
        setItems(after)
      })
  }
  return <ul>
    {
      items
        .map(({ id, name }, index) => {
          return <li data-name='Line' key={id}>
            <span>{name}</span>
            <Remove onRemove={onLineRemove} id={id}/>
          </li>
        })
    }
  </ul>
}

export default Receptions
