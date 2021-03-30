import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import './GoogleButton.scss';
import { images } from '../../../services/constants';

export function GoogleButton({ children, onClick }) {
  return (
    <div onClick={onClick} className='google-btn' aria-hidden='true'>
      <div className='google-icon-wrapper'>
        <img className='google-icon' src={images.googleIcon} alt='google-logo' />
      </div>
      <p className='btn-text'>
        <b>{children}</b>
      </p>
    </div>
  );
}

GoogleButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

GoogleButton.defaultProps = {
  onClick: noop,
  children: null,
};
