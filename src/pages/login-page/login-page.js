import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as yup from 'yup';

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

  if (props.user !== null) {
    props.history.push('/dashboard');
  }
  const handleSubmit = (values, formikProps) => {
    
    props.login({
      username: 'Miguel',
      id: 1,
    });
  }
  return (
    <div className="form-page">
      <Formik
        initialValues={schema}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {
          (formikProps) => {
            console.log(formikProps);
            return (
              <form onSubmit={formikProps.handleSubmit}>
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
                />
                <Button type="submit">Login</Button>
              </form>
            );
          }
        }
      </Formik>
    </div>
  )
}

const login = (user) => {
  return { type: 'LOGIN_USER', user }
};

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
export const LoginRedux = withConnectForLanding(Login);
