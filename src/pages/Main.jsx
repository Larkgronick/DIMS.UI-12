import './styles/Main.scss';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { DrawerRouter } from '../components/Drawer/DrawerRouter';
import Login from './Login';
import { UserTasks } from './UserTasks';
import { TaskTrack } from './TaskTrack';
import { Progress } from './Progress';
import { Settings } from './Settings';
import { About } from './About';
import { MainDataContext } from '../contexts/MainDataContext';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function Main() {
  return (
    <MainDataContext.Consumer>
      {({ isLogged, theme }) => (
        <UserTasksContext.Consumer>
          {({ isLoading }) => (
            <>
              <DrawerRouter />
              <main className={isLoading ? `${theme} drop-shadow` : theme}>
                <Switch>
                  <PrivateRoute path='/login' redirectPath='/' condition={!isLogged} component={Login} />
                  <PrivateRoute path='/members' condition={isLogged} component={Members} />
                  <PrivateRoute path='/tasks' condition={isLogged} component={Tasks} />
                  <PrivateRoute path='/user-tasks' condition={isLogged} component={UserTasks} />
                  <PrivateRoute path='/progress' condition={isLogged} component={Progress} />
                  <PrivateRoute path='/my-tasks' condition={isLogged} component={UserTasks} />
                  <PrivateRoute path='/task-track' condition={isLogged} component={TaskTrack} />
                  <PrivateRoute path='/settings' condition={isLogged} component={Settings} />
                  <PrivateRoute path='/' condition={isLogged} component={About} />
                </Switch>
              </main>
            </>
          )}
        </UserTasksContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
