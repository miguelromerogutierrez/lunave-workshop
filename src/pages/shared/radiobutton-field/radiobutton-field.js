import React from 'react';

const RadiobuttonField = ({error, labelText, ...props}) => {
    return (
      <div>
        <input {...props} />
        <label htmlFor={props.id}>{labelText}</label>
        {
          error 
          ? <p>{error}</p>
          : null
        }
      </div>
    );
}

export default RadiobuttonField;
