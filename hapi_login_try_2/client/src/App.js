// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRegistrationForm from './components/UserRegistrationForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={UserRegistrationForm} />
        {/* Add more routes here if needed */}
      </Switch>
    </Router>
  );
};

export default App;

