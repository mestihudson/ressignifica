import React from 'react'
import {
  HashRouter as Router, Switch, Route, Redirect, Link
} from 'react-router-dom'

import Receptions from '@/Receptions'
import Reception from '@/Reception'

const App = () => {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to='/reception/add' data-trigger='AddReception'
            >Add Reception</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/receptions">
            <Receptions/>
          </Route>
          <Route exact path="/reception/add">
            <Reception/>
          </Route>
          <Redirect from='/' to='/receptions' />
        </Switch>
      </Router>
    </div>
  )
}

export default App
