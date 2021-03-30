import { Link } from 'react-router-dom';
import { MainDataContext } from '../../contexts/MainDataContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import { Button } from '../Buttons/Button/Button';
import { menuItems, images } from '../../services/constants';

export function HowToTable() {
  return (
    <MainDataContext.Consumer>
      {({ userData }) => (
        <UserTasksContext.Consumer>
          {({ showUserTasks }) => {
            const { role } = userData;
            const buttons = menuItems[`drawer${role}`].slice(0, -1);
            const openPage = (name) => {
              const page = {
                'My tasks': showUserTasks(),
                'My progress': showUserTasks(),
              };
              return page[name];
            };
            return (
              <tbody className='table-body'>
                <tr className='row'>
                  <td>
                    <p>
                      Use
                      <b>
                        {`${' '} side menu`} <img src={images.burgerIcon} alt='burger-menu icon' />
                      </b>{' '}
                      to navigate through application.
                    </p>
                  </td>
                </tr>
                <tr className='row'>
                  <td>
                    <p>
                      Or <b>jump to work</b> right now:
                    </p>
                    <img src={images.birdIcon} alt='bird-con' />
                    {buttons.map(({ name, className, path }) => (
                      <Link onClick={() => openPage(name)} key={name} to={path}>
                        <Button className={className}>{name}</Button>
                      </Link>
                    ))}
                    <img src={images.birdIcon} alt='bird-icon' />
                  </td>
                </tr>
              </tbody>
            );
          }}
        </UserTasksContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
