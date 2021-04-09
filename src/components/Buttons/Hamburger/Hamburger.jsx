import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../../store/actions/drawerAction';
import { Button } from '../Button/Button';

import './Hamburger.scss';

export function Hamburger() {
  const dispatch = useDispatch();
  const {
    drawer: { drawerOpen },
    main: { theme },
  } = useSelector((state) => state);

  const toggle = () => {
    dispatch(drawerToggle());
  };

  return (
    <Button onClick={toggle} className={`bt-menu-trigger ${theme} ${drawerOpen && 'bt-menu-open'}`}>
      <span className={`${theme}-burger`} />
    </Button>
  );
}
