import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import './Hamburger.scss';

export function Hamburger({ showDrawer, toggle }) {
  return (
    <Button action={toggle} styles={`bt-menu-trigger ${showDrawer && 'bt-menu-open'}`}>
      <span />
    </Button>
  );
}

Hamburger.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
