import PropTypes from 'prop-types';
import { Component } from 'react';
import { MainDataContext } from './MainDataContext';
import { clearUserTracks, loadData, setData } from '../services/services';
import { getIndex } from '../services/helpers';

export class MainDataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      tasks: [],
    };
  }

  componentDidMount = () => {
    loadData('members')
      .then((members) => {
        this.setState({ members });
      })
      .catch(console.log);
    // TO DO Show message, when data load failed
    loadData('tasks')
      .then((tasks) => {
        this.setState({ tasks });
      })
      .catch(console.log);
    // TO DO Show message, when data load failed
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

  deleteData = (e, field) => {
    const { [field]: current } = this.state;
    const { name } = current[getIndex(e)];
    const removed = current.filter((item, index) => index !== getIndex(e));
    this.setState({
      [field]: removed,
    });
    if (field === 'tasks') {
      clearUserTracks(name);
    }
    setData(field, removed);
  };

  render() {
    const { members, tasks } = this.state;
    const { saveData, deleteData } = this;
    const value = {
      members,
      tasks,
      saveData,
      deleteData,
      updateMembersTasks: this.updateMembersTasks,
    };
    const { children } = this.props;
    return <MainDataContext.Provider value={value}>{children}</MainDataContext.Provider>;
  }
}

MainDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
