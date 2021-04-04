import './styles/Main.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import firebase from '../services/firebase';
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
import { setTheme, login } from '../store/actions/mainDataAction';
import { Spinner } from '../components/Loader/Spinner';

export function Main() {
  let listener = null;
  const dispatch = useDispatch();
  const {
    main: { theme, isLogged },
    user: { isLoading },
  } = useSelector((state) => state);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');

    listener = firebase.auth().onAuthStateChanged((user) => dispatch(login(user)));

    if (currentTheme) {
      return dispatch(setTheme(currentTheme));
    }

    return () => {
      listener?.();
    };
  }, []);
  return (
    <>
      <DrawerRouter />
      <Spinner />
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
  );
}
