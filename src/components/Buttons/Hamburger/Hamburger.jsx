import PropTypes from 'prop-types';
import { MainDataContext } from '../../../contexts/MainDataContext';
import { Button } from '../Button/Button';
import './Hamburger.scss';

export function Hamburger({ drawerOpen, drawerToggle }) {
  return (
    <MainDataContext.Consumer>
      {({ theme }) => {
        return (
          <Button onClick={drawerToggle} className={`bt-menu-trigger ${theme} ${drawerOpen && 'bt-menu-open'}`}>
            <span />
          </Button>
        );
      }}
    </MainDataContext.Consumer>
  );
}

Hamburger.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  drawerToggle: PropTypes.func.isRequired,
};
