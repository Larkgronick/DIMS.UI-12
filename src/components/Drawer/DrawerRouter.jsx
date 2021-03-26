import { Drawer } from './Drawer';
import './Drawer.scss';

export function DrawerRouter() {
  function renderDrawer(role) {
    switch (role) {
      case 'Admin':
      case 'Mentor':
        return <Drawer>drawerAdmin</Drawer>;
      case 'Member':
        return <Drawer>drawerMember</Drawer>;
      default:
        return null;
    }
  }

  return <aside>{renderDrawer('Admin')}</aside>;
}
