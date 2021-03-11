import { Drawer } from './Drawer';
import './Drawer.scss';
import { MainContext } from '../../services/context';

export function DrawerRouter() {
  function renderDrawer(role) {
    switch (role) {
      case 'Admin':
        return <Drawer>drawerAdmin</Drawer>;
      case 'Member':
        return <Drawer>drawerAdmin</Drawer>;
      default:
        return null;
    }
  }

  return <MainContext.Consumer>{({ userData }) => renderDrawer(userData.role)}</MainContext.Consumer>;
}
