import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

class Page extends Component {

  state = {
    userId: '',
    error: ''
  };

  handleChangeUserIdInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleUpdateUser = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${this.state.userId}`)
      .then((result) => {
        this.props.updateUser(result.data);
      })
      .catch(() => {
        this.setState({
          error: 'Hubo un error al actualizar el usuario'
        })
      });
  }

  handleExpiredSession = () => {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <pre>
          <b>User:</b><br />
          {JSON.stringify(this.props.user)}
        </pre>
        <input name="userId" placeholder="User ID" value={this.state.userId} onChange={this.handleChangeUserIdInput} />
        <button onClick={this.handleUpdateUser}>Update user</button>
        {
          !!this.state.error ?
          <div>
            <p>{this.state.error}</p>
            <p>Su sesion expirara al dar continuar</p>
            <button onClick={this.handleExpiredSession}>Continuar</button>
          </div>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchersToProps = {
  updateUser: (user) => {
    return { type: 'UPDATE_USER', user }
  },
  logout: () => {
    return { type: 'LOGOUT_USER' };
  }
}

const withConnect = connect(mapStateToProps, mapDispatchersToProps);

export default withConnect(Page);
