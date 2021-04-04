import './style/Popup.scss';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';
import { TASK_TRACK_VALIDATIONS } from '../../services/constants';
import { getCurrentDate, onFocusDate, onBlurDate, validateValues, convertDate } from '../../services/helpers';
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
    const { edit, userTasks, userTracks, track, subtask } = this.props;
    const { name } = userTasks[track];
    const { trackName, date, note } = userTracks[track];

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
          trackName: trackName[subtask],
          date: date[subtask],
          note: note[subtask],
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

  saveTrack = (action) => {
    const { close, save } = this.props;
    const { data } = this.state;

    if (this.validateData(TASK_TRACK_VALIDATIONS)) {
      save(data, action);
      close();
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
    const { close, edit, theme } = this.props;
    const { data, validation } = this.state;
    const { name, trackName, date, note } = data;
    const { trackNameErr, dateErr, noteErr, textMessage, dateMessage } = validation;

    return (
      <div className='modal'>
        <div className={`${theme} modal-content`}>
          <Button onClick={close} className='close'>
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
              placeholder={convertDate(date)}
              type='date'
              max='2999-12-31'
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
              <Button onClick={() => this.saveTrack('edit')} className='submit'>
                Edit
              </Button>
            ) : (
              <Button onClick={() => this.saveTrack('save')} className='submit'>
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
  userTracks: PropTypes.instanceOf(Array).isRequired,
  date: PropTypes.string,
  note: PropTypes.string,
  trackName: PropTypes.string,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  track: PropTypes.number.isRequired,
  subtask: PropTypes.number,
  edit: PropTypes.bool,
  theme: PropTypes.string.isRequired,
};
TaskTrackManager.defaultProps = {
  date: getCurrentDate,
  note: 'note',
  trackName: 'track name',
  subtask: 0,
  edit: false,
};
