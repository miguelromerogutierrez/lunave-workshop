import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const callFns = (fns) => (...args) => fns.forEach(fn => typeof fn === 'function' ? fn(...args) : null);

// import './input-field.scss';

function InputField(props) {
  const hasError = !!props.error;
  const className = classnames('input-field', { 'error': hasError });
  const inputRef = React.useRef(null);
  const cursorRef = React.useRef(0);
  const handleOnChange = (e) => {
    cursorRef.current = e.target.selectionStart;
  };
  React.useEffect(() => {
    if (props.value !== '' && inputRef.current !== null) {
      inputRef.current.selectionStart = inputRef.current.selectionEnd = cursorRef.current;
    }
  }, [props.value]);
  return (
    <div className={className}>
      <label className="input-field__label" htmlFor={props.id}>{props.labelText}</label>
      <input {...props} onChange={callFns([handleOnChange, props.onChange])} ref={inputRef} className="input-field__input" />
      {
        hasError
        ? <p className="input-field__error">{props.error}</p>
        : null
      }
    </div>
  );
}

InputField.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  ref: PropTypes.object,
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

InputField.defaultProps = {
  error: '',
  value: '',
  onChange: () => {},
  ref: null
};

export default InputField;
