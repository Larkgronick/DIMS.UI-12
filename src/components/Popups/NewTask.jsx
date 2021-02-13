import PropTypes from 'prop-types';
import { Component } from 'react';
import startIcon from '../../assets/images/startIcon.png';
import deadlineIcon from '../../assets/images/deadlineIcon.png';

import './style/Popup.css';

export class NewTask extends Component {
  constructor(props) {
    super(props);
    const { tasks, selected, edit } = this.props;
    if (edit) {
      this.state = {
        assigners: tasks[selected].assigners,
        name: tasks[selected].name,
        description: tasks[selected].description,
        start: tasks[selected].start,
        start_img: startIcon,
        deadline: tasks[selected].deadline,
        deadline_img: deadlineIcon,
      };
    } else {
      this.state = {
        assigners: [],
        name: '',
        description: '',
        start: '',
        start_img: startIcon,
        deadline: '',
        deadline_img: deadlineIcon,
      };
    }
  }

  saveAssigner = (e) => {
    const { assigners } = this.state;
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      assigners.push({ name: item, status: 'active' });
    } else {
      const removed = assigners.filter((el) => el.name !== item);
      this.setState({
        assigners: removed,
      });
    }
  };

  render() {
    const { tasks, members, modalToggle, edit, addTask, saveTask } = this.props;
    const { name, description, start, deadline, assigners } = this.state;
    const candidates = members.map((el) => el.name);
    console.log(tasks);

    return (
      <div className='modal'>
        <div className='modal-content'>
          <button className='close' onClick={modalToggle} type='button'>
            &times;
          </button>
          <form action=''>
            <label htmlFor='name-field'>
              Task Name:
              <input
                id='name-field'
                placeholder='Task Name'
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </label>
            <label htmlFor='description-field'>
              Description:
              <textarea
                id='description-field'
                placeholder='Task Description'
                readOnly={false}
                value={description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </label>
            <label htmlFor='start'>
              Start:
              <input id='start' type='date' value={start} onChange={(e) => this.setState({ start: e.target.value })} />
            </label>
            <label htmlFor='deadline'>
              Deadline:
              <input
                id='deadline'
                type='date'
                value={deadline}
                onChange={(e) => this.setState({ start: e.target.value })}
              />
            </label>
            <label htmlFor='assigners'>
              Assigners:
              <ul id='assigners'>
                {candidates.map((item) => (
                  <li className='assigner'>
                    <input
                      defaultChecked={assigners.includes(item)}
                      type='checkbox'
                      value='true'
                      name={item}
                      onChange={(e) => this.saveAssigner(e)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </label>
            {edit ? (
              <button
                onClick={() => {
                  saveTask(this.state);
                }}
                id='submit'
                type='button'
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  addTask(this.state);
                }}
                id='submit'
                type='button'
              >
                Create
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

NewTask.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  edit: PropTypes.bool.isRequired,
  modalToggle: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};
