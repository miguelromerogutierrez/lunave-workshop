import React from 'react';

import InputField from '../shared/input-field';
import RadiobuttonField from '../shared/radiobutton-field';

class RegisterForm extends React.Component {

  state = {
    username: '',
    password: '',
    user: null,
    genre: '',
    error: {
      username: '',
      password: ''
    }
  }

  handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(oldState => ({
      [name]: value,
      error: {
        ...oldState.error,
        [name]: value.length < 6 ? 'Error: Logintud minima debe ser de 6' : '',
      }
    }));
  }

  handleClickBtnSuma = () => {

    new Promise((resolve) => {
      setTimeout(
        () =>{
          resolve({
            id: 1,
            username: this.state.username,
            password: this.state.password
          })
        },
        500
      )
    }).then((user) => {
      this.setState({ user });
    })
  }

  render () {
    const { username, password, error, user } = this.state;
    if (user !== null) {
      return <h1>Welcome back {user.username}</h1>
    }
    return (
      <div className="App">

        <button onClick={() => {
          this.props.history.push('/social-cards')
        }}>Redirect To Social Cards</button>

        <InputField
          name="username"
          type="text"
          value={username}
          onChange={this.handleChangeInput}
          error={error.username}
        />

        <InputField 
          name="password"
          type="password"
          value={password}
          onChange={this.handleChangeInput}
          error={error.password}
        />

        <RadiobuttonField
          id="genre-male"
          name="genre"
          type="radio"
          onChange={this.handleChangeInput}
          value="Male"
          labelText="Masculino"
        />

        <RadiobuttonField
          id="genre-female"
          name="genre"
          type="radio"
          onChange={this.handleChangeInput}
          value="Female"
          labelText="Femenino"
        />

        <button
          onClick={this.handleClickBtnSuma}
          disabled={
            error.password || error.username
          }
        >
          Submit
        </button>
        
        <p>{JSON.stringify(this.state)}</p>

      </div>
    );
  }
}

export default RegisterForm;
