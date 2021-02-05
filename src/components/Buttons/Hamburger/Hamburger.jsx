import PropTypes from 'prop-types';
import './Hamburger.css';

export function Hamburger({ showDrawer, toggle }) {
  return (
    <button onClick={toggle} className={showDrawer ? 'bt-menu-trigger bt-menu-open' : 'bt-menu-trigger'} type='button'>
      <span />
    </button>
  );
}

Hamburger.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
};
