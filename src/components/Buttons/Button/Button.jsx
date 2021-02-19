import PropTypes from 'prop-types';
import './Button.scss';

export function Button({ name, styles, action }) {
  return (
    <button onClick={action} type='button' className={styles}>
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
