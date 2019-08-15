import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import login from '../../redux/actions/login';

import './styles.scss';

const useStyles = makeStyles(theme => ({
  myClass: {
    display: "block",
    margin: "15px 0"
  }
}));

const SignupSchema = yup.object().shape({
  userName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: yup.string()
    .min(6, 'La longitud del password debe ser minimo de 6')
    .required('Required'),
});

export default function Login(props) {
  const styles = useStyles();
  const schema = {
    userName: 'Mike',
    password: ''
  }
  console.log(props.user);
  if (props.user !== null) {
    props.history.push('/dashboard');
  }
  const handleSubmit = (values, formikProps) => {
    // ... validaciones 
    // ... api request
    axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then((result) => {
        // ... si exito
        console.log(result)
        props.login(result.data);
      })
      .catch((result) => {});

    // ... si no manejamos el error
  }
  return (
    <div className="form-page">
      <Formik
        initialValues={schema}
        onSubmit={handleSubmit}
      >
        {
          (formikProps) => {
            return (
              <form onSubmit={formikProps.handleSubmit} data-testid="form">
                <h1>Login</h1>
                <TextField
                  error={formikProps.errors.userName && formikProps.touched.userName}
                  type="text"
                  name="userName"
                  label="Username"
                  value={formikProps.values.userName}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  className={styles.myClass}
                  helperText={formikProps.touched.userName && formikProps.errors.userName}
                  inputProps={
                    {'data-testid': 'username'}
                  }
                />
                <TextField
                  error={formikProps.errors.password && formikProps.touched.password}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  helperText={formikProps.touched.password && formikProps.errors.password}
                  type="password"
                  name="password"
                  label="Password"
                  value={formikProps.values.password}
                  className={styles.myClass}
                  inputProps={
                    {'data-testid': 'password'}
                  }
                />
                <Button type="submit" data-testid="submit">Login</Button>
              </form>
            );
          }
        }
      </Formik>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchersTopros =   {
  login
};

const withConnectForLanding = connect(
  mapStateToProps,
  mapDispatchersTopros
);
export const LoginRedux = withConnectForLanding(Login);
