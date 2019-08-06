import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik } from 'formik';
import * as yup from 'yup';
import { validate } from '@babel/types';

const ccSchemaValidations = yup.object().shape({
  ccNumber: yup.string().length(16, 'Debe contener 16 digitos').matches(/[0-9]+/, 'Debe contener solo digitos'),
  ccMonthExpired: yup.string().required("Debes llenar el campo mes"),
  ccYearExpired: yup.string().required("Debes llenar el campo año"),
  ccCvv: yup.string().length(3, 'Debe contener 3 digitos'),
  ccOwnerName: yup.string().required('Este campo es requerido'),
  ccOwnerLastName: yup.string().required('Este campo es requerido'),
  ccAddress1: yup.string().required('Este campo es requerido'),
  ccAddress2: yup.string().required('Este campo es requerido'),
  ccCity: yup.string().required('Este campo es requerido'),
  ccState: yup.string().required('Este campo es requerido'),
  ccZipCode: yup.string().required('Este campo es requerido'),
})

export default function CCForm() {
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
  };
  return (
    <Formik
      initialValues={schema}
      validationSchema={ccSchemaValidations}
      validate={}
      onSubmit
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        handleSubmit
      }) => {
        return (

          <form onSubmit={handleSubmit}>
            <div className="cc-section">
              <TextField
              name="ccNumber"
              label="Numero de tarjeta" 
              error={touched.ccNumber && errors.ccNumber}
              helperText={touched.ccNumber && errors.ccNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              />
              <FormControl error={touched.ccMonthExpired && errors.ccMonthExpired}>
                <InputLabel htmlFor="ccMonthExpired">Mes</InputLabel>
                <Select
                  value={values.ccMonthExpired}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{
                    name: 'ccMonthExpired',
                    id: 'ccMonthExpired',
                  }}
                >
                  <MenuItem value={1}>Ene</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>Mar</MenuItem>
                  <MenuItem value={4}>Abr</MenuItem>
                  <MenuItem value={5}>Jun</MenuItem>
                </Select>
                {
                  touched.ccMonthExpired && errors.ccMonthExpired &&
                  <FormHelperText>{errors.ccMonthExpired}</FormHelperText>
                }
              </FormControl>
              <FormControl error={touched.ccMonthExpired && errors.ccMonthExpired}>
                <InputLabel htmlFor="ccYearExpired">Año</InputLabel>
                <Select
                  value={values.ccYearExpired}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{
                    name: 'ccYearExpired',
                    id: 'ccYearExpired',
                  }}
                >
                  <MenuItem value={1}>2019</MenuItem>
                  <MenuItem value={2}>2020</MenuItem>
                  <MenuItem value={3}>2021</MenuItem>
                  <MenuItem value={4}>2022</MenuItem>
                  <MenuItem value={5}>2023</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="ccCvv"
                label="Numero de seguridad"
                value={values.ccCvv}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
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
            <CCOwner
              touched={touched}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <Button type="submit">Enviar</Button>
          </form>
        );
      }}
    </Formik>
  )
}

function CCOwner({ touched, errors, handleBlur, handleChange }) {
  return (
    <div className="cc-owner-address">
    <TextField
    error={touched.ccAddress1 && errors.ccAddress1}
    helperText={touched.ccAddress1 && errors.ccAddress1}
    onBlur={handleBlur}
    onChange={handleChange} label="Calle" name="ccAddress1" />
    <TextField onBlur={handleBlur}
    onChange={handleChange} label="Colonia" name="ccAddress2" />
    <TextField onBlur={handleBlur}
    error={touched.ccCity && errors.ccCity}
    helperText={touched.ccCity && errors.ccCity}
    onChange={handleChange} label="Municipio" name="ccCity" />
    <TextField
    error={touched.ccState && errors.ccState}
    helperText={touched.ccState && errors.ccState}
    onBlur={handleBlur}
    onChange={handleChange} label="Estado" name="ccState" />
    <TextField onBlur={handleBlur}
    error={touched.ccZipCode && errors.ccZipCode}
    helperText={touched.ccZipCode && errors.ccZipCode}
    onChange={handleChange} label="Codigo postal" name="ccZipCode" />
  </div>
  );
}
