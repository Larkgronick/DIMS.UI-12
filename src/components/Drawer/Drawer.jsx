import PropTypes from 'prop-types';
import './Drawer.css';
import { Link } from 'react-router-dom';
import devLogo from '../../assets/images/devLogo.png';
import membersIcon from '../../assets/images/membersIcon.png';
import tasksIcon from '../../assets/images/tasksIcon.png';
import progressIcon from '../../assets/images/progressIcon.png';

const menuItems = [
  { name: 'Members', path: '/members', img: membersIcon },
  { name: 'Tasks', path: '/tasks', img: tasksIcon },
  { name: 'Progress', path: '/progress', img: progressIcon },
];

export function Drawer({ showDrawer, toggle }) {
  return (
    <aside className={showDrawer ? 'side-drawer open' : 'side-drawer'}>
      <img className='dev-logo' src={devLogo} alt='dev-incubator-logo' />
      {menuItems.map((item) => (
        <Link onClick={toggle} to={item.path} key={item.name} className='drawer-item'>
          <img alt='img' src={item.img} />
          <span className='drawer-item-name'> {item.name}</span>
        </Link>
      ))}
    </aside>
  );
}

Drawer.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
