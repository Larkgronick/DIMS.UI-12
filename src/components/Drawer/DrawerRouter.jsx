import { Drawer } from './Drawer';
import { UserTasksContext } from '../../contexts/UserTasksContext';
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

  return <UserTasksContext.Consumer>{({ userData }) => renderDrawer(userData.role)}</UserTasksContext.Consumer>;
}
