import './Drawer.scss';
import { useSelector } from 'react-redux';
import Drawer from './Drawer';

const drawer = {
  Admin: <Drawer>drawerAdmin</Drawer>,
  Mentor: <Drawer>drawerAdmin</Drawer>,
  Member: <Drawer>drawerMember</Drawer>,
};

export function DrawerRouter() {
  const {
    main: { role },
  } = useSelector((state) => state);

  const renderDrawer = (userRole) => {
    return drawer[userRole];
  };

  return <div>{renderDrawer(role)}</div>;
}
