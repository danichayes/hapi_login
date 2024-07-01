// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from './components/UserRegistrationForm.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import LoginForm from './components/LoginForm.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/register" element={<UserRegistrationForm />} />
          <Route path="/login" element={<LoginForm />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


