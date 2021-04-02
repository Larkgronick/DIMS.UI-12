import { Link } from 'react-router-dom';
import { MainDataContext } from '../../contexts/MainDataContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import { Button } from '../Buttons/Button/Button';
import { buttons, images } from '../../services/constants';

export function HowToTable() {
  return (
    <MainDataContext.Consumer>
      {({ role }) => (
        <UserTasksContext.Consumer>
          {({ showUserTasks }) => {
            const open = (isNew) => {
              if (isNew) {
                return () => showUserTasks();
              }
              return null;
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
                    <img src={images.birdIcon} alt='bird-in-egg' />
                    {buttons[role].map(({ name, className, load, path }) => (
                      <Link onClick={open(load)} key={name} to={path}>
                        <Button className={className}>{name}</Button>
                      </Link>
                    ))}
                    <img src={images.birdIcon} alt='bird-in-egg' />
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
