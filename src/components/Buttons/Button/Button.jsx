import PropTypes from 'prop-types';
import './Button.css';

export function Button({ name }) {
  return (
    <button type='button' className='button'>
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
};
