import { PureComponent } from 'react';
import firebase from '../services/firebase';
import { Login } from '../pages/Login';
import { Main } from '../pages/Main';

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
    return <div>{user ? <Main /> : <Login />}</div>;
  }
}
