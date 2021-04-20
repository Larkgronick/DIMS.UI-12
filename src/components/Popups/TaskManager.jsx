import './style/Popup.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeEdit } from '../../store/actions/modalAction';
import { loadUserData } from '../../store/actions/userDataAction';
import { saveData } from '../../store/actions/mainDataAction';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';
import { List } from '../FormElements/List';
import { TASK_VALIDATIONS, taskInit, taskInitVal } from '../../services/constants';
import { onFocusDate, onBlurDate, validateValues, convertDate, generateID } from '../../services/helpers';
import { addUserTasks } from '../../services/services';
import { validateCategory, validateField } from '../../services/validation';

export function TaskManager() {
  const dispatch = useDispatch();
  const [data, setData] = useState(taskInit);
  const [validation, setValidation] = useState(taskInitVal);
  const inputRef = useRef(null);
  const {
    main: { members, theme, tasks },
    modal: { edit, selected },
  } = useSelector((state) => state);

  useEffect(() => {
    if (edit) {
      setData(tasks[selected]);
    }
  }, []);

  const close = () => dispatch(closeEdit());

  const save = (newData, isNew) => dispatch(saveData(tasks, 'tasks', newData, selected, isNew));

  const load = () => dispatch(loadUserData());

  const validateData = (length) => {
    const validateResult = validateCategory('tasks', data);
    setValidation(validateResult);
    return validateValues(validateResult, length);
  };

  const saveTask = (isNew) => () => {
    if (isNew) {
      data.id = generateID();
    }
    if (validateData(TASK_VALIDATIONS)) {
      const { id, assigners } = data;
      addUserTasks(id, assigners);
      load();
      save(data, isNew);
      close();
    }
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    const error = `${name}Err`;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    setValidation((prevState) => {
      return {
        ...prevState,
        [error]: validateField(name, value),
      };
    });
  };

  const saveAssigner = () => {
    const field = inputRef.current;
    const checkBoxes = [...field.querySelectorAll("input[type='checkbox']")];
    const assigners = checkBoxes.map(({ checked, name }) => (checked ? name : null)).filter((el) => el !== null);
    setData((prevState) => {
      return {
        ...prevState,
        assigners,
      };
    });
  };

  const { name, description, start, deadline, assigners } = data;
  const { nameErr, descriptionErr, startErr, deadlineErr, textMessage, deadlineMessage } = validation;

  return (
    <div className='modal'>
      <div className={`${theme} modal-content`}>
        <Button onClick={close} className='close'>
          <span>&times;</span>
        </Button>
        <form>
          <Input
            isError={nameErr}
            errorMessage={textMessage}
            placeholder='Task Name'
            value={name}
            name='name'
            onChange={inputChange}
          >
            Task Name:
          </Input>
          <Textarea
            isError={descriptionErr}
            errorMessage={textMessage}
            placeholder='Task Description'
            value={description}
            name='description'
            onChange={inputChange}
          >
            Description:
          </Textarea>
          <Input
            isError={startErr}
            errorMessage={deadlineMessage}
            onFocus={onFocusDate}
            onBlur={onBlurDate}
            placeholder={convertDate(start)}
            type='date'
            max='2999-12-31'
            value={start}
            name='start'
            onChange={inputChange}
          >
            Start:
          </Input>
          <Input
            isError={deadlineErr}
            errorMessage={deadlineMessage}
            onFocus={onFocusDate}
            onBlur={onBlurDate}
            placeholder={convertDate(deadline)}
            type='date'
            max='2999-12-31'
            value={deadline}
            name='deadline'
            onChange={inputChange}
          >
            Deadline:
          </Input>
          <List
            inputRef={inputRef}
            items={members}
            elements={assigners}
            className='assigner'
            listId='assigners'
            onChange={saveAssigner}
          >
            Assigners:
          </List>
          {edit ? (
            <Button onClick={saveTask(false)} className='submit'>
              Edit
            </Button>
          ) : (
            <Button onClick={saveTask(true)} className='submit'>
              Create
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
