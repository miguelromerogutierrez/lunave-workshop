import React from 'react';
import RegisterForm from './pages/register-form/page';
import SocialCard from './pages/social-card/page';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={RegisterForm} />
      <Route path="/social-cards" exact component={SocialCard} />
    </Router>
  )
}

export default App;
