import PropTypes from 'prop-types';
import './Drawer.scss';
import { Link } from 'react-router-dom';
import { MainContext } from '../../services/context';
import devLogo from '../../assets/images/devLogo.png';
import { menuItems } from '../../services/constants';

export function Drawer({ children }) {
  return (
    <MainContext.Consumer>
      {({ drawerOpen, drawerToggle }) => {
        return (
          <aside className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
            <img className='dev-logo' src={devLogo} alt='dev-incubator-logo' />
            {menuItems[children].map(({ name, path, img }) => {
              return (
                <Link onClick={drawerToggle} to={path} key={name} className='drawer-item'>
                  <img alt='img' src={img} />
                  <span className='drawer-item-name'>{name}</span>
                </Link>
              );
            })}
          </aside>
        );
      }}
    </MainContext.Consumer>
  );
}

Drawer.propTypes = {
  children: PropTypes.string.isRequired,
};
