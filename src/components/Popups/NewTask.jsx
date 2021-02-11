import PropTypes from 'prop-types';
import { Component } from 'react';
import startIcon from '../../assets/images/startIcon.png';
import deadlineIcon from '../../assets/images/deadlineIcon.png';

import './style/Popup.css';

export class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      start: '',
      start_img: startIcon,
      deadline: '',
      deadline_img: deadlineIcon,
      members: 'Get members!',
    };
  }

  render() {
    const { modalToggle, addTask } = this.props;
    const { name, description, start, deadline } = this.state;

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
            <button
              onClick={(e) => {
                addTask(e, this.state);
              }}
              id='submit'
              type='button'
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

NewTask.propTypes = {
  modalToggle: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};
