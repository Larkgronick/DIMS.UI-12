import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Main.css';
import { Route } from 'react-router-dom';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { Progress } from './Progress';
import educationIcon from '../assets/images/educationIcon.png';
import startIcon from '../assets/images/startIcon.png';
import deadlineIcon from '../assets/images/deadlineIcon.png';

// data example
const membersBody = [
  {
    name: 'Vasya Sidorov',
    direction: 'JAVA',
    education: 'BSUIR',
    education_img: educationIcon,
    start: '28.01.2021',
    start_img: startIcon,
    age: '21',
    email: 'johndoe@design.com',
    tasks: [
      {
        name: 'Create the DB',
        description: '',
        start: '28.01.2021',
        start_img: startIcon,
        deadline: '28.01.2021',
        deadline_img: deadlineIcon,
      },
      {
        name: 'Implement the props',
        description: '',
        start: '28.01.2021',
        start_img: startIcon,
        deadline: '28.01.2021',
        deadline_img: deadlineIcon,
      },
    ],
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
    tasks: [],
  },
];

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: membersBody,
      openModal: false,
      selected: 0,
    };
  }

  modalToggle = () => {
    const { openModal } = this.state;
    this.setState({
      openModal: !openModal,
    });
  };

  addMember = (e, member) => {
    const { members } = this.state;
    e.preventDefault();
    members.push(member);
    this.setState({ openModal: false });
  };

  addTask = (e, task) => {
    const { members, selected } = this.state;
    e.preventDefault();
    members[selected].tasks.push(task);
    this.setState({ openModal: false });
  };

  selectMember = (e) => {
    const el = e.target.closest('.row');
    const selected = [...el.parentElement.children].indexOf(el);
    this.setState({
      selected,
    });
  };

  render() {
    const { members, openModal, selected } = this.state;
    const { showDrawer, toggle, logOut } = this.props;
    console.log(this.state);
    return (
      <main className={showDrawer ? 'drawer-open' : ''}>
        <Route
          path='/members'
          component={() => (
            <Members
              members={members}
              addMember={this.addMember}
              modalToggle={this.modalToggle}
              selectMember={this.selectMember}
              openModal={openModal}
              showDrawer={showDrawer}
              toggle={toggle}
              logOut={logOut}
            />
          )}
        />
        <Route
          path='/tasks'
          component={() => (
            <Tasks
              members={members}
              addTask={this.addTask}
              modalToggle={this.modalToggle}
              openModal={openModal}
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
