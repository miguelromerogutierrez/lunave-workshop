import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ error, ...props }) => {
  return (
    <div>
      <input
        {...props}
      />
      {
        error
        ? <p>{error}</p>
        : null
      }
    </div>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string.isRequired,
  type: PropTypes.string
}

export default InputField;
