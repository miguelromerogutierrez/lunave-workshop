import React from 'react';
import classnames from 'classnames';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { connect, Provider as ReduxProvider } from 'react-redux';

import RegisterForm from './pages/register-form/page';
import SocialCard from './pages/social-card/page';
import HNPage from './pages/hn-page/hn-page';
import HNPageRP from './pages/hn-page/hn-page-rp';
import HNPageRedux from './pages/hn-page/redux'

import './App.css';

const menuItems = [
  {
    name: 'Social cards',
    path: '/social-cards'
  },
  {
    name: 'Register form',
    path: '/register-form'
  },
  {
    name: 'Hacker news with HOCs',
    path: '/hacker-news'
  },
  {
    name: 'Hacker news with Render Props',
    path: '/hacker-news-rp'
  },
  {
    name: 'Hacker news with Redux',
    path: '/hacker-news-redux'
  }
]

const initialStateUser = {
  user: null
}

const userReducer = (state = initialStateUser, actions) => {
  debugger;
  switch(actions.type) {
    case 'LOGIN_USER':
      return { user: actions.user };
    case 'LOGOUT_USER':
      return { user: null };
    default:
      return state;
  }
}

const store = createStore(userReducer);

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Route path="/" exact component={LoginRedux} />
        <Route path="/dashboard" component={App2Redux} />
      </Router>
    </ReduxProvider>
  )
}

function Login(props) {
  if (props.user !== null) {
    props.history.push('/dashboard');
  }
  const handleClickLoginBtn = () => {
    props.login({
      username: 'Miguel',
      id: 1,
    });
  }
  return (
    <div>
      <h1>Login</h1>
      <input type="text" name="username" placeholder="Username" />
      <input type="text" name="password" placeholder="Password" />
      <button onClick={handleClickLoginBtn}>Login</button>
    </div>
  )
}

const login = (user) => {
  return  { type: 'LOGIN_USER', user }
};

const logout = () => {
  return { type: 'LOGOUT_USER' };
}

const withConnectForLanding = connect(
  (state) => {
    return {
      user: state.user
    }
  },
  {
    login
  }
);
const LoginRedux = withConnectForLanding(Login);

function App2(props) {
  if (props.user === null) {
    props.history.push('/');
    return null;
  }
  return (
    <Router basename="/dashboard">
      <HeaderWithRouter />
      <Route path="/register-form" exact component={RegisterForm} />
      <Route path="/social-cards" exact component={SocialCard} />
      <Route path="/hacker-news" exact component={HNPage} />
      <Route path="/hacker-news-rp" exact component={HNPageRP} />
      <Route path="/hacker-news-redux" exact component={HNPageRedux} />
    </Router>
  )
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const withConnet = connect(stateToProps);

const App2Redux = withConnet(App2);

function Header(props, context) {
  console.log(props);
  return (
    <div className="header">
      <ul>
        {
          menuItems.map(item => 
            <li 
              className={classnames({ active: props.location &&props.location.pathname === item.path })}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          )
        }
        <li><button onClick={props.logout}>Logout</button></li>
      </ul>
    </div>
  );
}

const withConnectForHeader = connect(
  () => {},
  {
    logout
  }
)
const HeaderWithRouter = withConnectForHeader(withRouter(Header));

export default App;
