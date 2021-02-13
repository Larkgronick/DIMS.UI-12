import { PureComponent } from 'react';
import { Drawer } from '../components/Drawer/Drawer';
import { Main } from '../pages/Main';

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  drawerToggle = () => {
    const { drawerOpen } = this.state;
    this.setState({
      drawerOpen: !drawerOpen,
    });
  };

  render() {
    const { drawerOpen } = this.state;
    return (
      <div>
        <Drawer showDrawer={drawerOpen} toggle={this.drawerToggle} />
        <Main showDrawer={drawerOpen} toggle={this.drawerToggle} />
      </div>
    );
  }
}
