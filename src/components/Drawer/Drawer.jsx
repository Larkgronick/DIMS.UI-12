import PropTypes from 'prop-types';
import './Drawer.scss';
import { Link } from 'react-router-dom';
import devLogo from '../../assets/images/devLogo.png';
import { drawerMenuItems } from '../../services/constants';

export function Drawer({ showDrawer, toggle }) {
  return (
    <aside className={showDrawer ? 'side-drawer open' : 'side-drawer'}>
      <img className='dev-logo' src={devLogo} alt='dev-incubator-logo' />
      {drawerMenuItems.map(({ name, path, img }) => (
        <Link onClick={toggle} to={path} key={name} className='drawer-item'>
          <img alt='img' src={img} />
          <span className='drawer-item-name'> {name}</span>
        </Link>
      ))}
    </aside>
  );
}

Drawer.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
