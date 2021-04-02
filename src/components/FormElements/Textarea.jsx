import PropTypes from 'prop-types';

export function Textarea({ children, errorMessage, isError, placeholder, value, onChange, name }) {
  return (
    <label htmlFor={name}>
      {children}
      <textarea
        className={isError ? 'error-border' : null}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className={isError ? 'error-message' : 'hide-error'}>{errorMessage}</div>
    </label>
  );
}

Textarea.propTypes = {
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
