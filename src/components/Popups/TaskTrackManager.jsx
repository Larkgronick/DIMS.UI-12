import './style/Popup.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeEdit } from '../../store/actions/modalAction';
import { saveTrackData } from '../../store/actions/userDataAction';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';
import { TASK_TRACK_VALIDATIONS, taskTrackInit, taskTrackInitVal } from '../../services/constants';
import { onFocusDate, onBlurDate, validateValues, convertDate } from '../../services/helpers';
import { validateCategory, validateField } from '../../services/validation';

export function TaskTrackManager() {
  const dispatch = useDispatch();
  const [data, setData] = useState(taskTrackInit);
  const [validation, setValidation] = useState(taskTrackInitVal);

  const {
    main: { theme },
    user: { userTasks, userTracks },
    modal: { track, subtask, edit },
  } = useSelector((state) => state);

  useEffect(() => {
    const { name } = userTasks[track];
    const { trackName, date, note } = userTracks[track];
    setData((prevState) => {
      return {
        ...prevState,
        name,
      };
    });
    if (edit) {
      setData(() => {
        return {
          name,
          trackName: trackName[subtask],
          date: date[subtask],
          note: note[subtask],
        };
      });
    }
  }, []);

  const close = () => dispatch(closeEdit());

  const save = (newData, action) => dispatch(saveTrackData(userTracks, newData, track, subtask, action));

  const validateData = (length) => {
    const validateResult = validateCategory('taskTracks', data);
    setValidation(validateResult);
    return validateValues(validateResult, length);
  };

  const saveTrack = (action) => {
    return () => {
      if (validateData(TASK_TRACK_VALIDATIONS)) {
        save(data, action);
        close();
      }
    };
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    const error = `${name}Err`;

    setData(() => {
      return {
        ...data,
        [name]: value,
      };
    });
    setValidation(() => {
      return {
        ...validation,
        [error]: validateField(name, value),
      };
    });
  };

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
            onChange={inputChange}
          >
            Date:
          </Input>
          <Input
            isError={trackNameErr}
            errorMessage={textMessage}
            placeholder='Track Name'
            value={trackName}
            name='trackName'
            onChange={inputChange}
          >
            Track Name:
          </Input>
          <Textarea
            isError={noteErr}
            errorMessage={textMessage}
            placeholder='Track Description'
            value={note}
            name='note'
            onChange={inputChange}
          >
            Note:
          </Textarea>
          {edit ? (
            <Button onClick={saveTrack('edit')} className='submit'>
              Edit
            </Button>
          ) : (
            <Button onClick={saveTrack('save')} className='submit'>
              Save
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
