import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import New from './pages/New.jsx';

export default function Contents() {
  return (
    <Router>
      <Link to="/new">New</Link>
      <Switch>
        <Route path="/new">
          <New/>
        </Route>
      </Switch>
    </Router>
  )
}
