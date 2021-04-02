import './Drawer.scss';
import { Link } from 'react-router-dom';
import { DrawerContext } from '../../contexts/DrawerContext';
import { MainDataContext } from '../../contexts/MainDataContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import devLogo from '../../assets/images/devLogo.png';
import { buttons } from '../../services/constants';

export function Drawer() {
  return (
    <MainDataContext>
      {({ role }) => (
        <DrawerContext.Consumer>
          {({ drawerOpen, drawerToggle }) => (
            <UserTasksContext.Consumer>
              {({ showUserTasks }) => {
                const open = (isNew) => {
                  if (isNew) {
                    return () => {
                      showUserTasks();
                      drawerToggle();
                    };
                  }
                  return () => drawerToggle();
                };
                return (
                  <div className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
                    <img className='dev-logo' src={devLogo} alt='dev-incubator-logo' />
                    {buttons[role].map(({ name, path, load, img }) => {
                      return (
                        <Link onClick={open(load)} to={path} key={name} className='drawer-item'>
                          <img alt='img' src={img} />
                          <span className='drawer-item-name'>{name}</span>
                        </Link>
                      );
                    })}
                    <div
                      className={`main-page ${drawerOpen ? 'show' : ''}`}
                      onClick={drawerToggle}
                      aria-hidden='true'
                    />
                  </div>
                );
              }}
            </UserTasksContext.Consumer>
          )}
        </DrawerContext.Consumer>
      )}
    </MainDataContext>
  );
}
