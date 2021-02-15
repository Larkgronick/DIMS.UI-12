import { PureComponent } from 'react';
import config from '../services/firebase';
import { Login } from '../pages/Login';
import { Drawer } from '../components/Drawer/Drawer';
import { Main } from '../pages/Main';

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      user: '',
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  componentDidMount() {
    config.auth().onAuthStateChanged((user) => {
      if (user) {
        this.clearErrors();
        this.setState({
          user,
        });
      } else {
        this.setState({
          user: '',
        });
      }
    });
  }

  clearErrors = () => {
    this.setState({
      emailError: '',
      passwordError: '',
    });
  };

  setEmail = (email) => {
    this.setState({ email });
  };

  setPassword = (password) => {
    this.setState({ password });
  };

  setError = (field, error) => {
    this.setState({
      [field]: error,
    });
  };

  signIn = () => {
    this.clearErrors();
    const { email, password } = this.state;
    config
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            this.setError('emailError', err.message);
            break;
          case 'auth/wrong-password':
            this.setError('passwordError', err.message);
            break;
          default:
            break;
        }
      });
  };

  signUp = () => {
    this.clearErrors();
    const { email, password } = this.state;
    config
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            this.setEmailError(err.message);
            break;
          case 'auth/weak-password':
            this.setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  logOut = () => {
    config.auth().signOut();
  };

  drawerToggle = () => {
    const { drawerOpen } = this.state;
    this.setState({
      drawerOpen: !drawerOpen,
    });
  };

  render() {
    const { user, drawerOpen, email, password, emailError, passwordError } = this.state;
    const app = (
      <div>
        <Drawer showDrawer={drawerOpen} toggle={this.drawerToggle} />
        <Main showDrawer={drawerOpen} toggle={this.drawerToggle} logOut={this.logOut} />
      </div>
    );

    return (
      <div>
        {user ? (
          app
        ) : (
          <Login
            email={email}
            password={password}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
            emailError={emailError}
            passwordError={passwordError}
            clearErrors={this.clearErrors}
            signIn={this.signIn}
            signUp={this.signUp}
            checkAuth={this.checkAuth}
          />
        )}
      </div>
    );
  }
}
