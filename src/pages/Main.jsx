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
import { getIndex, getSubtaskIndex } from '../services/helpers';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: membersBody,
      tasks: tasksBody,
      openModal: false,
      selected: 0,
      edit: false,
      track: 0,
      subtask: 0,
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

  setTaskStatus = (index, task, status) => {
    const { tasks } = this.state;
    const newTask = task;
    newTask.status[index] = status;
    this.setState({
      tasks,
    });
  };

  deleteTrackHistory = (track, index) => {
    const { tasks } = this.state;
    const toRemove = tasks.indexOf(track);
    track.note.splice(index, 1, []);
    track.date.splice(index, 1, []);
    tasks.splice(toRemove, 1, track);
    this.setState({
      tasks,
    });
  };

  render() {
    const { members, tasks, track, subtask, openModal, selected, edit } = this.state;
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
              tasks={tasks}
              members={members}
              track={track}
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
            <Progress members={members} tasks={tasks} selected={selected} showDrawer={showDrawer} toggle={toggle} />
          )}
        />
        <Route
          path='/task-track'
          component={() => (
            <TaskTrack
              tasks={tasks}
              members={members}
              track={track}
              subtask={subtask}
              selectItem={this.selectItem}
              addData={this.addData}
              editTrack={this.editTrack}
              closeEdit={this.closeEdit}
              openModal={openModal}
              showDrawer={showDrawer}
              deleteTrackHistory={this.deleteTrackHistory}
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
