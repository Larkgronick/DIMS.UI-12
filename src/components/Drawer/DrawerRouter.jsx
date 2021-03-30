import { Drawer } from './Drawer';
import { MainDataContext } from '../../contexts/MainDataContext';
import './Drawer.scss';

export function DrawerRouter() {
  const renderDrawer = (role) => {
    const drawer = {
      Admin: <Drawer>drawerAdmin</Drawer>,
      Mentor: <Drawer>drawerAdmin</Drawer>,
      Member: <Drawer>drawerMember</Drawer>,
    };
    return drawer[role];
  };

  return <MainDataContext.Consumer>{({ userData }) => renderDrawer(userData.role)}</MainDataContext.Consumer>;
}
