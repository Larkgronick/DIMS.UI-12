import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Button } from '../Buttons/Button/Button';
import startIcon from '../../assets/images/startIcon.png';
import deadlineIcon from '../../assets/images/deadlineIcon.png';
import './style/Popup.scss';

export class NewTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      start: '',
      startImg: startIcon,
      deadline: '',
      deadlineImg: deadlineIcon,
      members: 'Get members!',
    };
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
              <input id='name-field' name='name' placeholder='Task Name' value={name} onChange={this.inputChange} />
            </label>
            <label htmlFor='description-field'>
              Description:
              <textarea
                id='description-field'
                name='description'
                placeholder='Task Description'
                readOnly={false}
                value={description}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='start'>
              Start:
              <input id='start' name='start' type='date' value={start} onChange={this.inputChange} />
            </label>
            <label htmlFor='deadline'>
              Deadline:
              <input id='deadline' name='deadline' type='date' value={deadline} onChange={this.inputChange} />
            </label>
            <Button
              name='Create'
              action={(e) => {
                addTask(e, this.state);
              }}
              styles='submit'
            />
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
