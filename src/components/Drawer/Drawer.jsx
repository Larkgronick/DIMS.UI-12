import PropTypes from 'prop-types';
import './Drawer.scss';
import { Link } from 'react-router-dom';
import { DrawerContext } from '../../contexts/DrawerContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import devLogo from '../../assets/images/devLogo.png';
import { menuItems } from '../../services/constants';

export function Drawer({ children }) {
  return (
    <DrawerContext.Consumer>
      {({ drawerOpen, drawerToggle }) => (
        <UserTasksContext.Consumer>
          {({ showUserTasks }) => {
            const openPage = (name) => {
              if (name === 'My tasks' || name === 'My progress') {
                showUserTasks();
              }
              drawerToggle();
            };
            return (
              <div className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
                <img className='dev-logo' src={devLogo} alt='dev-incubator-logo' />
                {menuItems[children].map(({ name, path, img }) => {
                  return (
                    <Link onClick={() => openPage(name)} to={path} key={name} className='drawer-item'>
                      <img alt='img' src={img} />
                      <span className='drawer-item-name'>{name}</span>
                    </Link>
                  );
                })}
                <div className={`main-page ${drawerOpen ? 'show' : ''}`} onClick={drawerToggle} aria-hidden='true' />
              </div>
            );
          }}
        </UserTasksContext.Consumer>
      )}
    </DrawerContext.Consumer>
  );
}

Drawer.propTypes = {
  children: PropTypes.string.isRequired,
};
