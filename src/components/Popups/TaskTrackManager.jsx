import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';

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

  saveTrack = () => {
    const { saveTaskData, closeEdit } = this.props;
    const { date, note, trackName } = this.state;
    saveTaskData(date, note, trackName);
    closeEdit();
  };

  addTrack = () => {
    const { addTaskData, closeEdit } = this.props;
    const { date, note, trackName } = this.state;
    addTaskData(date, note, trackName);
    closeEdit();
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { closeEdit, edit } = this.props;
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
              <Button action={this.saveTrack} styles='submit'>
                Edit
              </Button>
            ) : (
              <Button action={this.addTrack} styles='submit'>
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
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  addTaskData: PropTypes.func.isRequired,
  saveTaskData: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  track: PropTypes.number.isRequired,
  subtask: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
};
