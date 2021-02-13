import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Main.css';
import { Route } from 'react-router-dom';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { UserTasks } from './UserTasks';
import { Progress } from './Progress';
import educationIcon from '../assets/images/educationIcon.png';
import startIcon from '../assets/images/startIcon.png';
import deadlineIcon from '../assets/images/deadlineIcon.png';

// data example

const tasksData = [
  {
    assigners: [{ name: 'Vasya Sidorov', status: 'active' }],
    name: 'Create the DB',
    description: '',
    start: '28.01.2021',
    start_img: startIcon,
    deadline: '28.01.2021',
    deadline_img: deadlineIcon,
  },
  {
    assigners: [
      { name: 'Vasya Sidorov', status: 'active' },
      { name: 'Petya Petrov', status: 'failed' },
    ],
    name: 'Implement the props',
    description: '',
    start: '28.01.2021',
    start_img: startIcon,
    deadline: '28.01.2021',
    deadline_img: deadlineIcon,
  },
];

const membersData = [
  {
    name: 'Vasya Sidorov',
    direction: 'JAVA',
    education: 'BSUIR',
    education_img: educationIcon,
    start: '28.01.2021',
    start_img: startIcon,
    age: '21',
    email: 'johndoe@design.com',
  },
  {
    name: 'Petya Petrow',
    direction: '.NET',
    education: 'BSU',
    education_img: educationIcon,
    start: '30.01.2021',
    start_img: startIcon,
    age: '22',
    email: 'johndoe2@design.com',
  },
];

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: membersData,
      tasks: tasksData,
      openModal: false,
      selected: 0,
      edit: false,
    };
  }

  selectItem = (e) => {
    const el = e.target.closest('.row');
    const selected = [...el.parentElement.children].indexOf(el);
    this.setState({
      selected,
    });
  };

  modalToggle = () => {
    const { openModal } = this.state;
    this.setState({
      openModal: !openModal,
    });
  };

  registerMember = () => {
    this.setState({
      edit: false,
    });
    this.modalToggle();
  };

  addMember = (member) => {
    const { members } = this.state;
    members.push(member);
    this.setState({ openModal: false });
  };

  editSelected = () => {
    this.setState({
      edit: true,
    });
    this.modalToggle();
  };

  saveMember = (member) => {
    const { members, selected } = this.state;
    this.setState({
      edit: false,
    });
    members.splice(selected, 1, member);
    this.modalToggle();
  };

  saveTask = (task) => {
    const { tasks, selected } = this.state;
    this.setState({
      edit: false,
    });
    tasks.splice(selected, 1, task);
    this.modalToggle();
  };

  addTask = (task) => {
    const { tasks } = this.state;
    tasks.push(task);
    this.setState({ openModal: false });
  };

  deleteMember = (e) => {
    const { members } = this.state;
    const el = e.target.closest('.row');
    const selected = [...el.parentElement.children].indexOf(el);
    const removed = members.filter((item, index) => index !== selected);
    this.setState({
      members: removed,
    });
  };

  deleteTask = (e) => {
    const { tasks } = this.state;
    const el = e.target.closest('.row');
    const selected = [...el.parentElement.children].indexOf(el);
    const removed = tasks.filter((item, index) => index !== selected);
    this.setState({
      tasks: removed,
    });
  };

  render() {
    const { members, tasks, openModal, selected, edit } = this.state;
    const { showDrawer, toggle, logOut } = this.props;
    return (
      <main className={showDrawer ? 'drawer-open' : ''}>
        <Route
          path='/members'
          component={() => (
            <Members
              members={members}
              registerMember={this.registerMember}
              addMember={this.addMember}
              editSelected={this.editSelected}
              saveMember={this.saveMember}
              deleteMember={this.deleteMember}
              edit={edit}
              modalToggle={this.modalToggle}
              selectItem={this.selectItem}
              openModal={openModal}
              showDrawer={showDrawer}
              toggle={toggle}
              logOut={logOut}
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
              addTask={this.addTask}
              editSelected={this.editSelected}
              saveTask={this.saveTask}
              deleteTask={this.deleteTask}
              edit={edit}
              modalToggle={this.modalToggle}
              selectItem={this.selectItem}
              openModal={openModal}
              showDrawer={showDrawer}
              toggle={toggle}
              logOut={logOut}
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
              showDrawer={showDrawer}
              toggle={toggle}
              logOut={logOut}
              selected={selected}
            />
          )}
        />
        <Route
          path='/progress'
          component={() => <Progress showDrawer={showDrawer} toggle={toggle} logOut={logOut} />}
        />
      </main>
    );
  }
}

Main.propTypes = {
  toggle: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};
