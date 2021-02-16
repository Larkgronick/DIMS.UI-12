import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Main.scss';
import { Route } from 'react-router-dom';
import { Members, Tasks, Progress } from './index';
import { membersBody } from '../services/constants';

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
    const { showDrawer, toggle } = this.props;
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
              selected={selected}
            />
          )}
        />
        <Route path='/progress' component={() => <Progress showDrawer={showDrawer} toggle={toggle} />} />
      </main>
    );
  }
}

Main.propTypes = {
  toggle: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};
