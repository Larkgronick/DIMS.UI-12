import PropTypes from 'prop-types';

export function Select({ children, isError, options, value, onChange, name }) {
  return (
    <label htmlFor={name}>
      {children}
      <select className={isError ? 'error-border' : null} name={name} value={value} onChange={onChange}>
        <option value='' disabled hidden>
          Choose...
        </option>
        {options.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select>
    </label>
  );
}

Select.propTypes = {
  isError: PropTypes.bool.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
