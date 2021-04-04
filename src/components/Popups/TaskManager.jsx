import './style/Popup.scss';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';
import { List } from '../FormElements/List';
import { TASK_VALIDATIONS } from '../../services/constants';
import {
  getCurrentDate,
  onFocusDate,
  onBlurDate,
  validateValues,
  generateID,
  convertDate,
} from '../../services/helpers';
import { addUserTasks } from '../../services/services';
import { validateCategory, validateField } from '../../services/validation';

export class TaskManager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: generateID(),
        name: '',
        description: '',
        start: getCurrentDate(),
        deadline: getCurrentDate(),
        assigners: [],
      },
      validation: {
        nameErr: false,
        descriptionErr: false,
        startErr: false,
        deadlineErr: false,
        textMessage: 'This field must have at least one character',
        deadlineMessage: 'Date cannot be lower than current',
      },
    };
  }

  componentDidMount() {
    const { tasks, selected, edit } = this.props;
    if (edit) {
      const { id, assigners, name, description, start, deadline } = tasks[selected];
      this.setState({
        data: {
          id,
          name,
          description,
          start,
          deadline,
          assigners,
        },
      });
    }
  }

  validateData = (length) => {
    const { data } = this.state;
    const validation = validateCategory('tasks', data);
    this.setState({ validation });
    return validateValues(validation, length);
  };

  saveTask = (isNew) => {
    const { data } = this.state;
    const { id, assigners } = data;
    const { save, close, load } = this.props;

    if (this.validateData(TASK_VALIDATIONS)) {
      addUserTasks(id, assigners);
      load();
      save(data, isNew);
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

  saveAssigner = () => {
    const field = this.inputRef;
    const checkBoxes = [...field.querySelectorAll("input[type='checkbox']")];
    const assigners = checkBoxes.map(({ checked, name }) => (checked ? name : null)).filter((el) => el !== null);
    this.setState(({ data }) => ({
      data: {
        ...data,
        assigners,
      },
    }));
  };

  setRef = (ref) => {
    this.inputRef = ref;
  };

  render() {
    const { members, close, edit, theme } = this.props;
    const { data, validation } = this.state;
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
              onChange={this.inputChange}
            >
              Task Name:
            </Input>
            <Textarea
              isError={descriptionErr}
              errorMessage={textMessage}
              placeholder='Task Description'
              value={description}
              name='description'
              onChange={this.inputChange}
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
              onChange={this.inputChange}
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
              onChange={this.inputChange}
            >
              Deadline:
            </Input>
            <List
              inputRef={this.setRef}
              items={members}
              elements={assigners}
              className='assigner'
              listId='assigners'
              onChange={this.saveAssigner}
            >
              Assigners:
            </List>
            {edit ? (
              <Button onClick={() => this.saveTask(false)} className='submit'>
                Edit
              </Button>
            ) : (
              <Button onClick={() => this.saveTask(true)} className='submit'>
                Create
              </Button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

TaskManager.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  edit: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};
