import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import './Button.scss';

export function Button({ children, action, styles }) {
  return (
    <button onClick={action} type='button' className={styles}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  action: PropTypes.func,
};

Button.defaultProps = {
  action: noop,
};
