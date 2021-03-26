import './styles/Main.scss';
import { Route } from 'react-router-dom';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { DrawerRouter } from '../components/Drawer/DrawerRouter';
import { UserTasks } from './UserTasks';
import { TaskTrack } from './TaskTrack';
import { Progress } from './Progress';
import { Settings } from './Settings';

export function Main() {
  return (
    <>
      <DrawerRouter />
      <main>
        <Route path='/members' component={Members} />
        <Route path='/tasks' component={Tasks} />
        <Route path='/user-tasks' component={UserTasks} />
        <Route path='/progress' component={Progress} />
        <Route path='/my-tasks' component={UserTasks} />
        <Route path='/task-track' component={TaskTrack} />
        <Route path='/settings' component={Settings} />
      </main>
    </>
  );
}
