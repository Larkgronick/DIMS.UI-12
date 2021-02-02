import PropTypes from 'prop-types';
import './Hamburger.css';

export function Hamburger(props) {
  let hamburgerClasses = 'bt-menu-trigger';
  const { showDrawer, toggle } = props;

  if (showDrawer) {
    hamburgerClasses = 'bt-menu-trigger bt-menu-open';
  }
  return (
    <button onClick={toggle} className={hamburgerClasses} type='button'>
      <span />
    </button>
  );
}

Hamburger.propTypes = {
  showDrawer: PropTypes.bool,
  toggle: PropTypes.bool,
};

Hamburger.defaultProps = {
  showDrawer: PropTypes.bool,
  toggle: PropTypes.bool,
};
