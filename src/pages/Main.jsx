import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Main.scss';
import { Route } from 'react-router-dom';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { DrawerRouter } from '../components/Drawer/DrawerRouter';
import { UserTasks } from './UserTasks';
import { TaskTrack } from './TaskTrack';
import { Progress } from './Progress';
import { Settings } from './Settings';
import { getIndex, removeUserTaskData } from '../services/helpers';
import { MainContext } from '../services/context';
import { setData, loadData, getUserEmail } from '../services/services';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      tasks: [],
      openModal: false,
      userData: {},
      userTasks: [],
      userIndex: 0,
      track: 0,
      subtask: 0,
      selected: 0,
      edit: false,
      error: false,
      drawerOpen: true,
    };
  }

  componentDidMount = () => {
    loadData('members')
      .then((res) => {
        this.setState({ members: res[0] });
      })
      .catch((err) => console.log(err));
    loadData('tasks')
      .then((res) => {
        this.setState({ tasks: res[0] });
      })
      .then(() => this.setUserData(this.state))
      .catch((err) => console.log(err));
  };

  setUserData = (data) => {
    const { members, tasks } = data;
    const userDataUpdate = members.filter((el) => el.email === getUserEmail())[0];
    const selectedUpdate = members.indexOf(userDataUpdate);
    const userTasksUpdate = tasks.filter((el) => el.assigners.includes(members[selectedUpdate].id));
    this.setState({
      userData: userDataUpdate,
      selected: selectedUpdate,
      userTasks: userTasksUpdate,
      userIndex: selectedUpdate,
    });
  };

  drawerToggle = () => {
    const { drawerOpen } = this.state;
    this.setState({
      drawerOpen: !drawerOpen,
    });
  };

  selectItem = (e, field) => {
    this.setState({
      [field]: getIndex(e, field),
    });
  };

  openEdit = (e, isEdit) => {
    const { drawerOpen } = this.state;
    this.setState({
      openModal: true,
    });
    if (isEdit) {
      this.setState({
        edit: true,
        selected: getIndex(e),
      });
    }
    if (drawerOpen) {
      this.drawerToggle();
    }
  };

  closeEdit = () => {
    this.setState({
      edit: false,
      openModal: false,
    });
  };

  editTrack = (e) => {
    this.setState({ edit: true });
    this.selectItem(e, 'subtask');
    this.openEdit();
  };

  saveData = (field, value) => {
    const { [field]: current, selected } = this.state;
    const newState = [...current];
    newState[selected] = value;
    this.setState({ [field]: newState });
    setData(field, newState);
    this.closeEdit();
  };

  addData = (field, value) => {
    const { [field]: current } = this.state;
    const newState = [...current].concat([value]);
    this.setState({
      [field]: newState,
      openModal: false,
    });
    setData(field, newState);
  };

  deleteData = (e, field) => {
    const { [field]: current } = this.state;
    const removed = current.filter((item, index) => index !== getIndex(e));
    this.setState({
      [field]: removed,
    });
    setData(field, removed);
  };

  updateTasks = (value) => {
    this.setState({
      tasks: value,
    });
    setData('tasks', value);
  };

  showUserTasks = (e) => {
    const { members, tasks } = this.state;
    const userTasks = tasks.filter((el) => el.assigners.includes(members[getIndex(e)].id));
    if (userTasks[0]) {
      const userIndex = userTasks[0].assigners.indexOf(members[getIndex(e)].id);
      this.setState({
        userTasks,
        userIndex,
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
    this.selectItem(e, 'selected');
  };

  saveTaskData = (date, note, trackName) => {
    const { userTasks, track, userIndex, subtask, tasks } = this.state;
    const newTrackName = userTasks[track].trackName[userIndex].items;
    const newNote = userTasks[track].note[userIndex].items;
    const newDate = userTasks[track].date[userIndex].items;

    newTrackName[subtask] = trackName;
    newNote[subtask] = note;
    newDate[subtask] = date;

    this.setState({
      userTasks,
    });
    setData('tasks', tasks);
  };

  addTaskData = (date, note, trackName) => {
    const { userTasks, track, userIndex, tasks } = this.state;
    userTasks[track].trackName[userIndex].items = userTasks[track].trackName[userIndex].items.concat([trackName]);
    userTasks[track].note[userIndex].items = userTasks[track].note[userIndex].items.concat([note]);
    userTasks[track].date[userIndex].items = userTasks[track].date[userIndex].items.concat([date]);

    this.setState({
      userTasks,
    });

    setData('tasks', tasks);
  };

  setTaskStatus = (index, task, status) => {
    const { tasks } = this.state;
    const newTask = task;
    newTask.status[index] = status;
    this.setState({
      tasks,
    });
    setData('tasks', tasks);
  };

  deleteMember = (e) => {
    const { tasks } = this.state;
    const newTasks = tasks.map(({ assigners, status, trackName, note, date, name, start, deadline }) => {
      const update = {};
      update.assigners = removeUserTaskData(assigners, getIndex(e));
      update.status = removeUserTaskData(status, getIndex(e));
      update.trackName = removeUserTaskData(trackName, getIndex(e));
      update.note = removeUserTaskData(note, getIndex(e));
      update.date = removeUserTaskData(date, getIndex(e));
      update.name = name;
      update.start = start;
      update.deadline = deadline;

      return update;
    });

    this.setState({
      tasks: newTasks,
    });
    this.deleteData(e, 'members');
  };

  deleteTrackHistory = (e) => {
    const { userTasks, track, userIndex, tasks } = this.state;
    const newTrackName = userTasks[track].trackName[userIndex].items;
    const newNote = userTasks[track].note[userIndex].items;
    const newDate = userTasks[track].date[userIndex].items;

    userTasks[track].trackName[userIndex].items = removeUserTaskData(newTrackName, getIndex(e));
    userTasks[track].note[userIndex].items = removeUserTaskData(newNote, getIndex(e));
    userTasks[track].date[userIndex].items = removeUserTaskData(newDate, getIndex(e));

    this.setState({ userTasks });
    setData('tasks', tasks);
  };

  render() {
    const {
      members,
      tasks,
      userData,
      userTasks,
      userIndex,
      track,
      subtask,
      openModal,
      selected,
      edit,
      error,
      drawerOpen,
    } = this.state;
    const { email } = this.props;
    return (
      <MainContext.Provider
        value={{
          members,
          tasks,
          userData,
          userTasks,
          userIndex,
          track,
          subtask,
          edit,
          openModal,
          selected,
          error,
          email,
          drawerOpen,
          drawerToggle: this.drawerToggle,
          openEdit: this.openEdit,
          closeEdit: this.closeEdit,
          addData: this.addData,
          addTaskData: this.addTaskData,
          setTaskStatus: this.setTaskStatus,
          editTrack: this.editTrack,
          saveData: this.saveData,
          updateTasks: this.updateTasks,
          saveTaskData: this.saveTaskData,
          deleteData: this.deleteData,
          deleteTrackHistory: this.deleteTrackHistory,
          deleteMember: this.deleteMember,
          showUserTasks: this.showUserTasks,
          selectItem: this.selectItem,
        }}
      >
        <DrawerRouter />
        <main className={drawerOpen ? 'drawer-open' : ''}>
          <Route path='/members' component={Members} />
          <Route path='/tasks' component={Tasks} />
          <Route path='/user-tasks' component={UserTasks} />
          <Route path='/progress' component={Progress} />
          <Route path='/my-tasks' component={UserTasks} />
          <Route path='/task-track' component={TaskTrack} />
          <Route path='/settings' component={Settings} />
        </main>
      </MainContext.Provider>
    );
  }
}

Main.propTypes = {
  email: PropTypes.string.isRequired,
};

export { MainContext };
