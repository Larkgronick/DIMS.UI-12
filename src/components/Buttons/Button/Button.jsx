import './Button.scss';
import PropTypes from 'prop-types';
import noop from '../../../shared/noop';

export function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} type='button' className={className}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: noop,
  children: null,
};
