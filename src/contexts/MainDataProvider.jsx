import { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '../services/firebase';
import { MainDataContext } from './MainDataContext';
import { clearUserTracks, loadData, setData, loadMemberData } from '../services/services';
import { getIndex } from '../services/helpers';

export class MainDataProvider extends Component {
  listener = null;

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      members: [],
      tasks: [],
      role: '',
      name: '',
      lastName: '',
      email: '',
      theme: 'dark',
    };
  }

  componentDidMount = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setState({
        theme,
      });
    }
    this.listener = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { userData } = await loadMemberData();
        const { role, name, lastName, email } = userData;

        this.setState({
          isLogged: true,
          role,
          name,
          lastName,
          email,
        });

        loadData('members')
          .then((members) => {
            this.setState({ members });
          })
          .catch(console.log);
        loadData('tasks')
          .then((tasks) => {
            this.setState({ tasks });
          })
          .catch(console.log);
      } else {
        this.setState({
          isLogged: false,
        });
      }
    });
  };

  componentWillUnmount() {
    this.listener?.();
  }

  deleteData = (e, field) => {
    const { [field]: current } = this.state;
    const { name } = current[getIndex(e)];
    if (window.confirm('Are you sure you wish to delete this item?')) {
      const removed = current.filter((item, index) => index !== getIndex(e));
      this.setState({
        [field]: removed,
      });
      if (field === 'tasks') {
        clearUserTracks(name);
      }
      setData(field, removed);
    }
  };

  saveData = (field, value, selected, isNew) => {
    const { [field]: current } = this.state;

    let newState;
    if (isNew) {
      newState = [...current].concat([value]);
    } else {
      newState = [...current];
      newState[selected] = value;
    }
    this.setState({ [field]: newState });

    setData(field, newState);
  };

  switchTheme = (isLight) => {
    if (isLight) {
      this.setState({
        theme: 'light',
      });
      localStorage.setItem('theme', 'light');
    } else {
      this.setState({
        theme: 'dark',
      });
      localStorage.setItem('theme', 'dark');
    }
  };

  render() {
    const { isLogged, members, tasks, role, name, lastName, email, isLoading, theme } = this.state;
    const { saveData, deleteData, switchTheme } = this;
    const value = {
      isLogged,
      members,
      tasks,
      role,
      name,
      lastName,
      email,
      isLoading,
      saveData,
      deleteData,
      switchTheme,
      theme,
    };
    const { children } = this.props;
    return <MainDataContext.Provider value={value}>{children}</MainDataContext.Provider>;
  }
}

MainDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
