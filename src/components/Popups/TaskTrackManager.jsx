import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';

export class TaskTrackManager extends PureComponent {
  constructor(props) {
    super(props);
    const { edit, userTasks, userIndex, track, subtask } = this.props;
    console.log(edit);
    console.log(subtask);
    if (edit) {
      this.state = {
        name: userTasks[track].name,
        trackName: userTasks[track].trackName[userIndex][subtask],
        date: userTasks[track].date[userIndex][subtask],
        note: userTasks[track].note[userIndex][subtask],
      };
    } else {
      this.state = {
        name: userTasks[track].name,
        trackName: '',
        date: '',
        note: '',
      };
    }
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { closeEdit, addTaskData, saveTaskData, edit } = this.props;
    const { name, trackName, date, note } = this.state;

    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button name={<span>&times;</span>} action={closeEdit} styles='close' />
          <form action=''>
            <p htmlFor='name-field'>
              Track for Task:
              <span className='attention'>{` ${name}`}</span>
            </p>
            <label htmlFor='start'>
              Date:
              <input id='date' name='date' type='date' value={date} onChange={this.inputChange} />
            </label>
            <label htmlFor='track-name'>
              Track Name:
              <input
                id='track-name'
                name='trackName'
                placeholder='Track Name'
                value={trackName}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='description-field'>
              Note:
              <textarea
                id='description-field'
                name='note'
                placeholder='Task Description'
                readOnly={false}
                value={note}
                onChange={this.inputChange}
              />
            </label>
            {edit ? (
              <Button
                name='Edit'
                action={() => {
                  saveTaskData(date, note, trackName);
                  closeEdit();
                }}
                styles='submit'
              />
            ) : (
              <Button
                name='Save'
                action={() => {
                  addTaskData(date, note, trackName);
                  closeEdit();
                }}
                styles='submit'
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}

TaskTrackManager.propTypes = {
  userTasks: PropTypes.instanceOf(Array).isRequired,
  userIndex: PropTypes.number.isRequired,
  addTaskData: PropTypes.func.isRequired,
  saveTaskData: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  track: PropTypes.number.isRequired,
  subtask: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
};
