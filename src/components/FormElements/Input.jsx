import PropTypes from 'prop-types';
import { onFocusDate, onBlurDate } from '../../services/helpers';

export function Input({
  children,
  errorMessage,
  isError,
  type,
  min,
  max,
  placeholder,
  value,
  valueAsDate,
  onChange,
  name,
  onFocus,
  onBlur,
}) {
  return (
    <label htmlFor={name}>
      {children}
      <input
        className={isError ? 'error-border' : null}
        type={type}
        name={name}
        min={min}
        max={max}
        placeholder={placeholder}
        value={value}
        valueasdate={valueAsDate}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete='off'
      />
      <div className={isError ? 'error-message' : 'hide-error'}>{errorMessage}</div>
    </label>
  );
}

Input.propTypes = {
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  valueAsDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

Input.defaultProps = {
  type: '',
  min: '',
  max: '',
  valueAsDate: '',
  onFocus: () => onFocusDate(),
  onBlur: () => onBlurDate(),
};
