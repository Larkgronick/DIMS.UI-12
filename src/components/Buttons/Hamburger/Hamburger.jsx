import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import './Hamburger.scss';

export function Hamburger({ drawerOpen, drawerToggle }) {
  return (
    <Button action={drawerToggle} styles={`bt-menu-trigger ${drawerOpen && 'bt-menu-open'}`}>
      <span />
    </Button>
  );
}

Hamburger.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  drawerToggle: PropTypes.func.isRequired,
};
