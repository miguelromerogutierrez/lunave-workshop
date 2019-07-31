import React from 'react';
import RegisterForm from './pages/register-form/page';
import SocialCard from './pages/social-card/page';
import HNPage from './pages/hn-page/hn-page';
import HNPageRP from './pages/hn-page/hn-page-rp';
import HNPageRedux from './pages/hn-page/redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={RegisterForm} />
      <Route path="/social-cards" exact component={SocialCard} />
      <Route path="/hacker-news" exact component={HNPageRP} />
      <Route path="/hacker-news-redux" exact component={HNPageRedux} />
    </Router>
  )
}

export default App;
