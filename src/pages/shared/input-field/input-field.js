import React from 'react';

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

export default InputField;
