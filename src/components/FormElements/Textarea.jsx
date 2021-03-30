import PropTypes from 'prop-types';

export function Textarea({ children, errorMessage, isError, placeholder, value, onChange, name }) {
  return (
    <label htmlFor={name}>
      {children}
      <textarea
        className={isError ? 'error-border' : null}
        name={name}
        placeholder={isError ? errorMessage : placeholder}
        value={value}
        onChange={onChange}
      />
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
