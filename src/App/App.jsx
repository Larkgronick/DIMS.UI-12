import { PureComponent } from 'react';
import firebase from '../services/firebase';
import { Login } from '../pages/Login';
import { Main } from '../pages/Main';
import { DrawerProvider } from '../contexts/DrawerProvider';
import { MainDataProvider } from '../contexts/MainDataProvider';
import { UserTasksProvider } from '../contexts/UserTasksProvider';
import { ModalProvider } from '../contexts/ModalProvider';

export class App extends PureComponent {
  listener = null;

  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user.uid,
        });
      } else {
        this.setState({
          user: '',
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener?.();
  }

  render() {
    const { user } = this.state;
    // TO DO:  Set correct welcome message
    return (
      <>
        {user ? (
          <MainDataProvider>
            <UserTasksProvider>
              <ModalProvider>
                <DrawerProvider>
                  <Main />
                </DrawerProvider>
              </ModalProvider>
            </UserTasksProvider>
          </MainDataProvider>
        ) : (
          <>
            <Login />
          </>
        )}
      </>
    );
  }
}
