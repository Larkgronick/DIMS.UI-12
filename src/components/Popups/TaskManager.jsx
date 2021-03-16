import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';
import { List } from '../FormElements/List';
import { TASK_VALIDATIONS } from '../../services/constants';
import { getCurrentDate, onFocusDate, onBlurDate, validateValues } from '../../services/helpers';
import { validateTasks, validateField } from '../../services/validation';

export class TaskManager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        description: '',
        start: getCurrentDate(),
        deadline: getCurrentDate(),
        assigners: '',
        status: [],
        trackName: [],
        date: [],
        note: [],
      },
      validation: {
        nameErr: false,
        descriptionErr: false,
        startErr: false,
        deadlineErr: false,
        textMessage: 'This field must have at least one character',
        dateMessage: 'Date cannot be greater than current or lesser than 01 January 1970',
        deadlineMessage: 'Date cannot be lower than current',
      },
    };
  }

  componentDidMount() {
    const { tasks, selected, edit } = this.props;
    const { assigners, status, name, trackName, date, note, description, start, deadline } = tasks[selected];
    if (edit) {
      this.setState({
        data: {
          name,
          description,
          start,
          deadline,
          assigners,
          status,
          trackName,
          date,
          note,
        },
      });
    }
  }

  validateData = (length) => {
    const { data, validation } = this.state;
    this.setState({ validation: validateTasks(data) });
    return validateValues(validation, length);
  };

  saveTask = () => {
    const { data } = this.state;
    const { saveData } = this.props;

    if (this.validateData(TASK_VALIDATIONS)) {
      saveData('tasks', data);
    }
  };

  addTask = () => {
    const { data } = this.state;
    const { addData } = this.props;
    const toValidate = 4;

    if (this.validateData(toValidate)) {
      addData('tasks', data);
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
    const checkBoxes = [...document.querySelectorAll("input[type='checkbox']")];
    const assigners = checkBoxes.map(({ checked, name }) => (checked ? name : 'disabled'));
    const status = checkBoxes.map(({ checked }) => (checked ? 'active' : 'disabled'));

    this.setState(({ data }) => ({
      data: {
        ...data,
        assigners,
        status,
      },
    }));
  };

  render() {
    const { members, closeEdit, edit } = this.props;
    const { data, validation } = this.state;
    const { name, description, start, deadline, assigners } = data;
    const { nameErr, descriptionErr, startErr, deadlineErr, textMessage, dateMessage, deadlineMessage } = validation;
    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button onClick={closeEdit} className='close'>
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
              errorMessage={dateMessage}
              onFocus={onFocusDate}
              onBlur={onBlurDate}
              placeholder={start}
              type='date'
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
              placeholder={deadline}
              type='date'
              value={deadline}
              name='deadline'
              onChange={this.inputChange}
            >
              Deadline:
            </Input>
            <List
              items={members}
              elements={assigners}
              className='assigner'
              listId='assigners'
              onChange={this.saveAssigner}
            >
              Assigners:
            </List>
            {edit ? (
              <Button onClick={this.saveTask} className='submit'>
                Edit
              </Button>
            ) : (
              <Button onClick={this.addTask} className='submit'>
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
  closeEdit: PropTypes.func.isRequired,
  addData: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};
