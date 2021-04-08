import './Drawer.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';
import { showUserTasks } from '../../store/actions/userDataAction';
import { menuItems } from '../../services/constants';
import devLogo from '../../assets/images/devLogo.png';

export function Drawer() {
  const dispatch = useDispatch();

  const {
    drawer: { drawerOpen },
    main: { role },
  } = useSelector((state) => state);

  const toggle = () => dispatch(drawerToggle());

  const open = (isNew) => () => {
    toggle();
    if (isNew) {
      dispatch(showUserTasks());
    }
  };

  return (
    <div className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
      <img className='dev-logo' src={devLogo} alt='dev-incubator-logo' />
      {role &&
        menuItems[`drawer${role}`].map(({ name, path, load, img }) => {
          return (
            <Link onClick={open(load)} to={path} key={name} className='drawer-item'>
              <img alt='img' src={img} />
              <span className='drawer-item-name'>{name}</span>
            </Link>
          );
        })}
      <div className={`main-page ${drawerOpen ? 'show' : ''}`} onClick={toggle} aria-hidden='true' />
    </div>
  );
}
