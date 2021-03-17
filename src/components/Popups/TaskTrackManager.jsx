import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';
import { TASK_TRACK_VALIDATIONS } from '../../services/constants';
import { getCurrentDate, onFocusDate, onBlurDate, validateValues } from '../../services/helpers';
import { validateCategory, validateField } from '../../services/validation';

export class TaskTrackManager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        trackName: '',
        date: getCurrentDate(),
        note: '',
      },
      validation: {
        trackNameErr: false,
        dateErr: false,
        noteErr: false,
        textMessage: 'This field must have at least one character',
        dateMessage: 'Date cannot be greater than current or lesser than 01 January 1970',
      },
    };
  }

  componentDidMount() {
    const { edit, userTasks, userIndex, track, subtask } = this.props;
    const { name } = userTasks[track];
    const trackName = userTasks[track].trackName[userIndex].items[subtask];
    const date = userTasks[track].date[userIndex].items[subtask];
    const note = userTasks[track].note[userIndex].items[subtask];

    this.setState(({ data }) => ({
      data: {
        ...data,
        name,
      },
    }));
    if (edit) {
      this.setState({
        data: {
          name,
          trackName,
          date,
          note,
        },
      });
    }
  }

  validateData = (length) => {
    const { data } = this.state;
    const test = validateCategory('taskTracks', data);
    this.setState({ validation: test });
    return validateValues(test, length);
  };

  saveTrack = () => {
    const { saveTaskData, closeEdit } = this.props;
    const { data } = this.state;
    const { date, note, trackName } = data;

    if (this.validateData(TASK_TRACK_VALIDATIONS)) {
      saveTaskData(date, note, trackName);
      closeEdit();
    }
  };

  addTrack = () => {
    const { addTaskData, closeEdit } = this.props;
    const { data } = this.state;
    const { date, note, trackName } = data;

    if (this.validateData(TASK_TRACK_VALIDATIONS)) {
      addTaskData(date, note, trackName);
      closeEdit();
    }
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    const error = `${name}Err`;
    this.setState(({ data, validation }) => ({
      data: {
        ...data,
        [name]: value,
      },
      validation: {
        ...validation,
        [error]: validateField(name, value),
      },
    }));
  };

  render() {
    const { closeEdit, edit } = this.props;
    const { data, validation } = this.state;
    const { name, trackName, date, note } = data;
    const { trackNameErr, dateErr, noteErr, textMessage, dateMessage } = validation;

    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button onClick={closeEdit} className='close'>
            <span>&times;</span>
          </Button>
          <form>
            <p htmlFor='name-field'>
              Track for Task:
              <span className='attention'>{` ${name}`}</span>
            </p>
            <Input
              isError={dateErr}
              errorMessage={dateMessage}
              onFocus={onFocusDate}
              onBlur={onBlurDate}
              placeholder={date}
              type='date'
              value={date}
              name='date'
              onChange={this.inputChange}
            >
              Date:
            </Input>
            <Input
              isError={trackNameErr}
              errorMessage={textMessage}
              placeholder='Track Name'
              value={trackName}
              name='trackName'
              onChange={this.inputChange}
            >
              Track Name:
            </Input>
            <Textarea
              isError={noteErr}
              errorMessage={textMessage}
              placeholder='Track Description'
              value={note}
              name='note'
              onChange={this.inputChange}
            >
              Note:
            </Textarea>
            {edit ? (
              <Button onClick={this.saveTrack} className='submit'>
                Edit
              </Button>
            ) : (
              <Button onClick={this.addTrack} className='submit'>
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
