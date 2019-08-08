import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import RegisterForm from '../register-form/page';
import SocialCard from '../social-card/page';
import HNPage from '../hn-page/hn-page';
import HNPageRP from '../hn-page/hn-page-rp';
import HNPageRedux from '../hn-page/redux'
import CCForm from '../creditcard-form/cc-form';
import { HeaderWithRouter as Header } from '../shared/header/header';
import PaymentForm from '../payment-form/payment-form';

export default function Dashboard(props) {
  if (props.user === null) {
    props.history.push('/');
    return null;
  }
  return (
    <Router basename="/dashboard">
      <Header />
      <Route path="/register-form" exact component={RegisterForm} />
      <Route path="/social-cards" exact component={SocialCard} />
      <Route path="/hacker-news" exact component={HNPage} />
      <Route path="/hacker-news-rp" exact component={HNPageRP} />
      <Route path="/hacker-news-redux" exact component={HNPageRedux} />
      <Route path="/cc-form" exact component={CCForm} />
      <Route path="/payment-form" exact component={PaymentForm} />
    </Router>
  )
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const withConnet = connect(stateToProps);

export const App2Redux = withConnet(Dashboard);