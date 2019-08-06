import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

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
  },
  {
    name: 'Credict card form',
    path: '/cc-form'
  }
]


function Header(props, context) {
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

const logout = () => {
  return { type: 'LOGOUT_USER' };
}

const withConnectForHeader = connect(
  () => {},
  {
    logout
  }
)
export const HeaderWithRouter = withConnectForHeader(withRouter(Header));