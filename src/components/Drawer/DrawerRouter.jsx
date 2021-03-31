import { Drawer } from './Drawer';
import { MainDataContext } from '../../contexts/MainDataContext';
import './Drawer.scss';

const drawer = {
  Admin: <Drawer>drawerAdmin</Drawer>,
  Mentor: <Drawer>drawerAdmin</Drawer>,
  Member: <Drawer>drawerMember</Drawer>,
};

export function DrawerRouter() {
  const renderDrawer = (role) => {
    return drawer[role];
  };

  return <MainDataContext.Consumer>{({ role }) => renderDrawer(role)}</MainDataContext.Consumer>;
}
