import React from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Formik } from 'formik';
import * as yup from 'yup';

import TextField from '../ui/TextField';
import Select, { InvexFieldSelect, InvexMenuItem } from '../ui/Select';

import * as services from './services';

const ccSchemaValidations = yup.object().shape({
  ccNumber: yup.string()
    .matches(/[0-9]{16}/, 'Debe contener 16 digitos'),
  ccMonthExpired: yup.string().required("Debes llenar el campo mes"),
  ccYearExpired: yup.string().required("Debes llenar el campo año"),
  ccCvv: yup.string().length(3, 'Debe contener 3 digitos').required('Debes llenar este campo'),
  ccOwnerName: yup.string().max(50, 'Debe contener un minimo de 50 caracteres').required('Este campo es requerido'),
  ccOwnerLastName: yup.string().max(50, 'Debe contener un minimo de 50 caracteres').required('Este campo es requerido'),
  ccAddress1: yup.string().required('Este campo es requerido'),
  ccAddress2: yup.string(),
  ccCity: yup.string().required('Este campo es requerido'),
  ccState: yup.string().required('Este campo es requerido'),
  ccZipCode: yup.string().required('Este campo es requerido'),
  ccHood: yup.string().required('Este campo es requerido')
})

const schema = {
  ccNumber: '',
  ccMonthExpired: 1,
  ccYearExpired: 1,
  ccCvv: '',
  ccOwnerName: '',
  ccOwnerLastName: '',
  ccAddress1: '',
  ccAddress2: '',
  ccCity: '',
  ccState: '',
  ccZipCode: '',
  ccHood: '',
};
export default class CCForm extends React.Component {

  state = {
    states: [],
    hoods: [],
    cities: [],
    pending: true,
    showSuccess: false,
    showError: false,
    msg: ''
  }

  handleZipCodeBlur = (hoods) => {
    this.setState({ hoods })
  }

  handleStatesBlur = (codeState) => {
    const { cities } = this.state.states.find((state) => state.code === codeState);
    this.setState({
      cities
    });
  }

  handleSubmit = (values) => {
    if (typeof this.props.onSubmit === 'function') {
      return this.props.onSubmit(values)
    }
    services.submitForm(values)
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            showSuccess: true,
            msg: result.msg
          })
        }
      }).catch(error => {
        this.setState({
          showError: true,
          msg: error.msg
        })
      })
  }

  componentDidMount() {
    // this.setState({ pending: true });
    services.getStates()
      .then((result) => {
        this.setState({
          states: result,
          pending: false
        })
      })
  }

  render() {
    if (this.state.pending) return <p>Cargando datos</p>
    if (this.state.showSuccess) return <SuccessForm><b>{this.state.msg}</b></SuccessForm>
    if (this.state.showError) return <ErrorForm>{this.state.msg}</ErrorForm>
    return (
      <Formik
        initialValues={schema}
        validationSchema={ccSchemaValidations}
        onSubmit={this.handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          handleSubmit,
          setErrors
        }) => {
          return (

            <form onSubmit={handleSubmit}>
              <CCSection
                touched={touched}
                values={values}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <CCOwner
                touched={touched}
                values={values}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <CCOwnerAddress
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                states={this.state.states}
                hoods={this.state.hoods}
                cities={this.state.cities}
                onZipCodeBlur={this.handleZipCodeBlur}
                onStateBlur={this.handleStatesBlur}
                setErrors={setErrors}
              />
              <Button type="submit">Enviar</Button>
            </form>
          );
        }}
      </Formik>
    );
  }

}

function CCOwnerAddress({ touched, values, errors, handleBlur, handleChange, states, hoods, onZipCodeBlur, onStateBlur, cities, setErrors }) {
  const handleBlurZipCode = (event) => {
    handleBlur(event);
    services.getCitiesByZC(event.target.value)
      .then((result) => onZipCodeBlur(result))
      .catch(error => {
        onZipCodeBlur([]);
        setErrors({ ccZipCode: error.msg });
      });
  }

  const handleBlurState = (event) => {
    handleBlur(event);
    onStateBlur(event.target.value);
  }
  return (
    <div className="cc-owner-address">
      <TextField
        error={touched.ccAddress1 && errors.ccAddress1}
        helperText={touched.ccAddress1 && errors.ccAddress1}
        onBlur={handleBlur}
        onChange={handleChange} label="Calle" name="ccAddress1" />

      <TextField onBlur={handleBlur}
        onChange={handleChange} label="Colonia" name="ccAddress2" />

      <FormControl error={touched.ccState && errors.ccState}>
        <InputLabel htmlFor="ccState">Estado</InputLabel>
        <Select
          value={values.ccState}
          onChange={handleChange}
          onBlur={handleBlurState}
          inputProps={{
            name: 'ccState',
            id: 'ccState',
          }}
        >
          {
            states.map(state => {
              return <MenuItem value={state.code}>{state.name}</MenuItem>
            })
          }
        </Select>
        {
          touched.ccState && errors.ccState &&
          <FormHelperText>{errors.ccState}</FormHelperText>
        }
      </FormControl>

      <FormControl error={touched.ccCity && errors.ccCity}>
        <InputLabel htmlFor="ccCity">Municipio</InputLabel>
        <Select
          value={values.ccCity}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={cities.length === 0}
          inputProps={{
            name: 'ccCity',
            id: 'ccCity',
          }}
        >
          {
            cities.map(state => {
              return <MenuItem value={state.code}>{state.name}</MenuItem>
            })
          }
        </Select>
        {
          touched.ccCity && errors.ccCity &&
          <FormHelperText>{errors.ccCity}</FormHelperText>
        }
      </FormControl>

      <TextField
        onBlur={handleBlurZipCode}
        value={values.ccZipCode}
        error={touched.ccZipCode && errors.ccZipCode}
        helperText={touched.ccZipCode && errors.ccZipCode}
        onChange={handleChange}
        label="Codigo postal"
        name="ccZipCode"
      />

      <FormControl error={touched.ccHood && errors.ccHood}>
        <InputLabel htmlFor="ccHood">Colonia</InputLabel>
        <Select
          value={values.ccHood}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={hoods.length === 0}
          inputProps={{
            name: 'ccHood',
            id: 'ccHood',
          }}
        >
          {
            hoods.map(hood => {
              return <MenuItem value={hood.code}>{hood.name}</MenuItem>
            })
          }
        </Select>
        {
          touched.ccHood && errors.ccHood &&
          <FormHelperText>{errors.ccHood}</FormHelperText>
        }
      </FormControl>

    </div>
  );
}

CCOwnerAddress.propTypes = {
  states: PropTypes.array,
  hoods: PropTypes.array,
  onZipCodeBlur: PropTypes.func.isRequired,
  onStateBlur: PropTypes.func.isRequired,
}

CCOwnerAddress.defaultProps = {
  states: [],
  hoods: []
}

function CCOwner({ touched, values, errors, handleBlur, handleChange }) {
  return (
    <div className="cc-owner">
      <TextField
        error={touched.ccOwnerName && errors.ccOwnerName}
        helperText={touched.ccOwnerName && errors.ccOwnerName}
        onBlur={handleBlur}
        onChange={handleChange}
        label="Nombre de Titular"
        name="ccOwnerName"
      />
      <TextField onBlur={handleBlur}
        error={touched.ccOwnerLastName && errors.ccOwnerLastName}
        helperText={touched.ccOwnerLastName && errors.ccOwnerLastName}
        onChange={handleChange} label="Apellidos de Titular" name="ccOwnerLastName" />
    </div>
  );
}

function CCSection({ touched, values, errors, handleBlur, handleChange }) {
  return (
    <div className="cc-section">
      <TextField
        name="ccNumber"
        label="Numero de tarjeta"
        error={touched.ccNumber && errors.ccNumber}
        helperText={touched.ccNumber && errors.ccNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <InvexFieldSelect
        error={touched.ccMonthExpired && errors.ccMonthExpired}
        id={'ccMonthExpired'}
        labelText={'Mes'}
        value={values.ccMonthExpired}
        onChange={handleChange}
        onBlur={handleBlur}
        name={'ccMonthExpired'}
        hasError={!!(touched.ccMonthExpired && errors.ccMonthExpired)}
      >
        <InvexMenuItem value={1}>Ene</InvexMenuItem>
        <InvexMenuItem value={2}>Feb</InvexMenuItem>
        <InvexMenuItem value={3}>Mar</InvexMenuItem>
        <InvexMenuItem value={4}>Abr</InvexMenuItem>
        <InvexMenuItem value={5}>Jun</InvexMenuItem>
      </InvexFieldSelect>
      <InvexFieldSelect
        error={touched.ccYearExpired && errors.ccYearExpired}
        id={'ccYearExpired'}
        labelText={'Año'}
        value={values.ccYearExpired}
        onChange={handleChange}
        onBlur={handleBlur}
        name={'ccYearExpired'}
        hasError={!!(touched.ccYearExpired && errors.ccYearExpired)}
      >
        <InvexMenuItem value={1}>2019</InvexMenuItem>
        <InvexMenuItem value={2}>2020</InvexMenuItem>
        <InvexMenuItem value={3}>2021</InvexMenuItem>
        <InvexMenuItem value={4}>2022</InvexMenuItem>
        <InvexMenuItem value={5}>2023</InvexMenuItem>
      </InvexFieldSelect>
      <TextField
        name="ccCvv"
        label="Numero de seguridad"
        value={values.ccCvv}
        onChange={handleChange}
        onBlur={handleBlur}
        inputProps={
          {maxLength: 3}
        }
      />
    </div>

  );
}

function SuccessForm(props) {
  return (
    <div>
      <h1>Exito!</h1>
      <p>{props.children}</p>
    </div>
  );
}

function ErrorForm(props) {
  return (
    <div>
      <h1>Ocurrio un error!</h1>
      <p>{props.children}</p>
    </div>
  );
}
