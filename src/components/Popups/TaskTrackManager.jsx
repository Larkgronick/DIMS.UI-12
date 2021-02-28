import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';

export class TaskTrackManager extends PureComponent {
  constructor(props) {
    super(props);
    const { tasks, edit, tasksToView, index, track, subtask } = this.props;
    console.log(track);
    if (edit) {
      this.state = {
        // name: tasksToView[track].name,
        // date: tasksToView[track].date[index][tasks[track].date[index].length - 1],
        // note: tasksToView[track].note[index][tasks[track].note[index].length - 1],
        name: '',
        date: '',
        note: '',
      };
    } else {
      this.state = {
        name: tasksToView[track].name,
        date: '',
        note: '',
      };
    }
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveTask = () => {
    const { date, note } = this.state;
    const { closeEdit, tasksToView, track, index } = this.props;
    tasksToView[track].date[index].push(date);
    tasksToView[track].note[index].push(note);
    closeEdit();
  };

  render() {
    const { closeEdit } = this.props;
    const { name, date, note } = this.state;
    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button name={<span>&times;</span>} action={closeEdit} styles='close' />
          <form action=''>
            <p htmlFor='name-field'>
              Task Name:
              <span className='attention'>{` ${name}`}</span>
            </p>
            <label htmlFor='start'>
              Date:
              <input id='date' name='date' type='date' value={date} onChange={this.inputChange} />
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
            <Button name='Save' action={this.saveTask} styles='submit' />
          </form>
        </div>
      </div>
    );
  }
}

TaskTrackManager.propTypes = {
  tasks: PropTypes.instanceOf(Array).isRequired,
  tasksToView: PropTypes.instanceOf(Array).isRequired,
  closeEdit: PropTypes.func.isRequired,
  track: PropTypes.number.isRequired,
  subtask: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
};
