import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input/Input';
import { Textarea } from '../FormElements/Textarea/Textarea';

export class TaskTrackManager extends PureComponent {
  constructor(props) {
    super(props);
    const { userTasks, track } = this.props;
    this.state = {
      name: userTasks[track].name,
      trackName: '',
      date: '',
      note: '',
    };
  }

  componentDidMount() {
    const { edit, userTasks, userIndex, track, subtask } = this.props;
    const trackName = userTasks[track].trackName[userIndex][subtask];
    const date = userTasks[track].date[userIndex][subtask];
    const note = userTasks[track].note[userIndex][subtask];
    if (edit) {
      this.setState({
        trackName,
        date,
        note,
      });
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
          <Button action={closeEdit} styles='close'>
            <span>&times;</span>
          </Button>
          <form action=''>
            <p htmlFor='name-field'>
              Track for Task:
              <span className='attention'>{` ${name}`}</span>
            </p>
            <Input type='date' value={date} name='date' action={this.inputChange}>
              Date:
            </Input>
            <Input placeholder='Track Name' value={trackName} name='trackName' action={this.inputChange}>
              Track Name:
            </Input>
            <Textarea placeholder='Track Description' value={note} name='note' action={this.inputChange}>
              Note:
            </Textarea>
            {edit ? (
              <Button
                action={() => {
                  saveTaskData(date, note, trackName);
                  closeEdit();
                }}
                styles='submit'
              >
                Edit
              </Button>
            ) : (
              <Button
                action={() => {
                  addTaskData(date, note, trackName);
                  closeEdit();
                }}
                styles='submit'
              >
                Save
              </Button>
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
