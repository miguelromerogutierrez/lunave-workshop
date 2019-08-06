import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { LoginRedux as LoginPage } from './pages/login-page/login-page';
import { App2Redux as Dashboard } from './pages/dashboard/dashboard';

import { store } from './store';

import './App.css';

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Route path="/" exact component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </ReduxProvider>
  )
}

export default App;
