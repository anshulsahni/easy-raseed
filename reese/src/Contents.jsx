import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import New from './pages/New.jsx';

export default function Contents() {
  return (
    <Router>
      <Switch>
        <Route path="/new">
          <New/>
        </Route>
      </Switch>
    </Router>
  )
}
