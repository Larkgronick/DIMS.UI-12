import { PureComponent } from 'react';
import firebase from '../services/firebase';
import { Login } from '../pages/Login';
import { Drawer } from '../components/Drawer/Drawer';
import { Main } from '../pages/Main';

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      user: '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

  drawerToggle = () => {
    const { drawerOpen } = this.state;
    this.setState({
      drawerOpen: !drawerOpen,
    });
  };

  render() {
    const { user, drawerOpen } = this.state;
    const app = (
      <div>
        <Drawer showDrawer={drawerOpen} toggle={this.drawerToggle} />
        <Main showDrawer={drawerOpen} toggle={this.drawerToggle} />
      </div>
    );
    return <div>{user ? app : <Login />}</div>;
  }
}
