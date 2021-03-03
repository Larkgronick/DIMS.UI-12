import PropTypes from 'prop-types';

export function Input({ children, type, min, max, placeholder, value, valueasdate, action, name }) {
  return (
    <label htmlFor={name}>
      {children}
      <input
        type={type}
        name={name}
        min={min}
        max={max}
        placeholder={placeholder}
        value={value}
        valueasdate={valueasdate}
        onChange={action}
      />
    </label>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  valueasdate: PropTypes.string,
};

Input.defaultProps = {
  type: '',
  min: '',
  max: '',
  valueasdate: '',
};