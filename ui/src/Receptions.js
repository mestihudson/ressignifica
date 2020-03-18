import React from 'react'

import Api from '@/services/Api'
import Navigation from '@/services/Navigation'

const Remove = ({ id, onRemove }) => {
  const onClick = () => {
    onRemove(id)
  }
  return <button data-trigger='Remove' data-id={id} onClick={onClick}
  >Remover</button>
}

const Edit = ({ id, onEdit }) => {
  const onClick = () => {
    onEdit(id)
  }
  return <button data-trigger='Edit' data-id={id} onClick={onClick}
  >Editar</button>
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

  const onLineEdit = (id) => {
    Navigation.go(`/#/reception/edit/${id}`)
  }

  return <ul>
    {
      items
        .map(({ id, name }, index) => {
          return <li data-name='Line' key={id}>
            <span>{name}</span>
            <Remove onRemove={onLineRemove} id={id}/>
            <Edit onEdit={onLineEdit} id={id}/>
          </li>
        })
    }
  </ul>
}

export default Receptions
