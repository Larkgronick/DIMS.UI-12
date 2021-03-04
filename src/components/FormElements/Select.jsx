import PropTypes from 'prop-types';

export function Select({ children, options, value, action, name }) {
  return (
    <label htmlFor={name}>
      {children}
      <select name={name} value={value} onChange={action}>
        {options.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select>
    </label>
  );
}

Select.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
