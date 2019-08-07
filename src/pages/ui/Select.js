import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { styled } from '@material-ui/styles';
import Select from '@material-ui/core/Select'

const InvexSelect = styled(Select)({
  margin: '10px',
  minWidth: '200px',
  fontSize: '18px',
});

const InvexInputLabel = styled(InputLabel)({
  color: 'green'
});

export const InvexMenuItem = styled(MenuItem)({
  color: 'red'
});

export const InvexFieldSelect = ({error, id, labelText, value, onChange, onBlur, name, children, hasError}) => {
  return (
    <FormControl error={hasError}>
      <InvexInputLabel htmlFor={id}>{labelText}</InvexInputLabel>
      <InvexSelect
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{
          name,
          id,
        }}
      >
        {children}
      </InvexSelect>
      {
        hasError &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl>
  )
}

export default InvexSelect;
