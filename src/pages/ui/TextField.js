import React from 'react';
import { styled } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const InvexTextField = styled(TextField)({
  margin: '10px',
  fontSize: '18px',
  color: '#ff3e33',
});

export const InvexTextFieldFullCustom = ({error, id, labelText, value, onChange, onBlur, name, hasError}) => {
  return (
    <FormControl error={hasError}>
      <InputLabel htmlFor={id}>{labelText}</InputLabel>
      <Input
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {
        hasError &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl>
  )
}

export default InvexTextField;
