import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showUserTasks } from '../../store/actions/userDataAction';
import { Button } from '../Buttons/Button/Button';
import { buttons, images } from '../../services/constants';

export function HowToTable() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.main);

  const open = (isNew) => {
    if (isNew) {
      return () => dispatch(showUserTasks());
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
          <div className='jump-to'>
            {buttons[role].map(({ name, className, load, path }) => (
              <Link onClick={open(load)} key={name} to={path}>
                <Button className={className}>{name}</Button>
              </Link>
            ))}
          </div>
          <img src={images.birdIcon} alt='bird-in-egg' />
        </td>
      </tr>
    </tbody>
  );
}
