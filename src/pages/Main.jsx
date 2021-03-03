import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Main.scss';
import { Route } from 'react-router-dom';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { UserTasks } from './UserTasks';
import { TaskTrack } from './TaskTrack';
import { Progress } from './Progress';
import { membersBody, tasksBody } from '../services/constants';
import { getIndex } from '../services/helpers';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: membersBody,
      tasks: tasksBody,
      openModal: false,
      userTasks: [],
      userIndex: 0,
      track: 0,
      subtask: 0,
      selected: 0,
      edit: false,
    };
  }

  selectItem = (e, field) => {
    this.setState({
      [field]: getIndex(e, field),
    });
  };

  openEdit = () => {
    const { toggle, showDrawer } = this.props;
    this.setState({
      openModal: true,
    });
    if (showDrawer) {
      toggle();
    }
  };

  closeEdit = () => {
    this.setState({
      edit: false,
      openModal: false,
    });
  };

  editTrack = () => {
    this.setState({
      edit: true,
      openModal: true,
    });
  };

  editData = (e) => {
    this.editTrack();
    this.setState({
      selected: getIndex(e),
    });
  };

  saveData = (field, value) => {
    const { [field]: current, selected } = this.state;
    current.splice(selected, 1, value);
    this.setState({
      edit: false,
      openModal: false,
    });
  };

  addData = (field, value) => {
    const { [field]: current } = this.state;
    current.push(value);
    this.setState({ openModal: false });
  };

  deleteData = (e, field) => {
    const { [field]: current } = this.state;
    this.setState({
      [field]: current.filter((item, index) => index !== getIndex(e)),
    });
  };

  showUserTasks = (e) => {
    const { members, tasks } = this.state;
    const userTasks = tasks.filter((el) => el.assigners.includes(members[getIndex(e)].id));
    const userIndex = userTasks[0].assigners.indexOf(members[getIndex(e)].id);
    this.setState({
      userTasks,
      userIndex,
      selected: getIndex(e),
    });
  };

  saveTaskData = (date, note, trackName) => {
    const { userTasks, track, userIndex, subtask } = this.state;
    const newUserTask = [...userTasks];
    newUserTask[track].trackName[userIndex].splice(subtask, 1, trackName);
    newUserTask[track].date[userIndex].splice(subtask, 1, date);
    newUserTask[track].note[userIndex].splice(subtask, 1, note);
    this.setState({
      userTasks: newUserTask,
    });
  };

  addTaskData = (date, note, trackName) => {
    const { userTasks, track, userIndex } = this.state;
    const newUserTask = [...userTasks];
    newUserTask[track].date[userIndex].push(date);
    newUserTask[track].trackName[userIndex].push(trackName);
    newUserTask[track].note[userIndex].push(note);
    this.setState({
      userTasks: newUserTask,
    });
  };

  setTaskStatus = (index, task, status) => {
    const { tasks } = this.state;
    const newTask = task;
    newTask.status[index] = status;
    this.setState({
      tasks,
    });
  };

  render() {
    const { members, tasks, userTasks, userIndex, track, subtask, openModal, selected, edit } = this.state;
    const { showDrawer, toggle } = this.props;

    return (
      <main className={showDrawer ? 'drawer-open' : ''}>
        <Route
          path='/members'
          component={() => (
            <Members
              members={members}
              openEdit={this.openEdit}
              closeEdit={this.closeEdit}
              addData={this.addData}
              editData={this.editData}
              saveData={this.saveData}
              deleteData={this.deleteData}
              showUserTasks={this.showUserTasks}
              edit={edit}
              openModal={openModal}
              showDrawer={showDrawer}
              toggle={toggle}
              selectItem={this.selectItem}
              selected={selected}
            />
          )}
        />
        <Route
          path='/tasks'
          component={() => (
            <Tasks
              members={members}
              tasks={tasks}
              openEdit={this.openEdit}
              closeEdit={this.closeEdit}
              addData={this.addData}
              editData={this.editData}
              saveData={this.saveData}
              deleteData={this.deleteData}
              edit={edit}
              openModal={openModal}
              showDrawer={showDrawer}
              toggle={toggle}
              selected={selected}
            />
          )}
        />
        <Route
          path='/user-tasks'
          component={() => (
            <UserTasks
              userTasks={userTasks}
              userIndex={userIndex}
              tasks={tasks}
              members={members}
              track={track}
              addTaskData={this.addTaskData}
              selectItem={this.selectItem}
              openEdit={this.openEdit}
              closeEdit={this.closeEdit}
              openModal={openModal}
              setTaskStatus={this.setTaskStatus}
              showDrawer={showDrawer}
              toggle={toggle}
              selected={selected}
            />
          )}
        />
        <Route
          path='/progress'
          component={() => (
            <Progress
              members={members}
              userTasks={userTasks}
              tasks={tasks}
              userIndex={userIndex}
              selected={selected}
              showDrawer={showDrawer}
              toggle={toggle}
            />
          )}
        />
        <Route
          path='/task-track'
          component={() => (
            <TaskTrack
              userTasks={userTasks}
              userIndex={userIndex}
              tasks={tasks}
              members={members}
              track={track}
              subtask={subtask}
              selectItem={this.selectItem}
              saveTaskData={this.saveTaskData}
              addData={this.addData}
              editTrack={this.editTrack}
              closeEdit={this.closeEdit}
              openModal={openModal}
              showDrawer={showDrawer}
              toggle={toggle}
              selected={selected}
              edit={edit}
            />
          )}
        />
      </main>
    );
  }
}

Main.propTypes = {
  toggle: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};
