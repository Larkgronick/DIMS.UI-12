import PropTypes from 'prop-types';

export function Textarea({ children, placeholder, value, action, name }) {
  return (
    <label htmlFor={name}>
      {children}
      <textarea name={name} placeholder={placeholder} value={value} onChange={action} />
    </label>
  );
}

Textarea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
