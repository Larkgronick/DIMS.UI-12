import { Drawer } from './Drawer';
import { UserTasksContext } from '../../contexts/UserTasksContext';
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

  return <UserTasksContext.Consumer>{({ userData }) => renderDrawer(userData.role)}</UserTasksContext.Consumer>;
}
