import PropTypes from 'prop-types';
import './Button.css';

export function Button(props) {
  const { name } = props;
  return (
    <button type='button' className='button'>
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string,
};
Button.defaultProps = {
  name: PropTypes.string,
};
