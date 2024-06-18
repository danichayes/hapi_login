// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from '../../client/src/components/UserRegistration';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<UserRegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
