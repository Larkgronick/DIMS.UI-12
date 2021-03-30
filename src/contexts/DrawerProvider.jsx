import PropTypes from 'prop-types';
import { Component } from 'react';
import { DrawerContext } from './DrawerContext';

export class DrawerProvider extends Component {
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
    const { drawerToggle } = this;
    const { children } = this.props;
    const value = { drawerOpen, drawerToggle };
    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
  }
}

DrawerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
