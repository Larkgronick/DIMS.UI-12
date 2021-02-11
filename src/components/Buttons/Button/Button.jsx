import PropTypes from 'prop-types';
import './Button.css';

export function Button({ name, action, color }) {
  return (
    <button onClick={action} type='button' className={`button ${color}`}>
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
