import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Input } from '../FormElements/Input';
import { Textarea } from '../FormElements/Textarea';
import { List } from '../FormElements/List';

export class TaskManager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      start: '',
      deadline: '',
      assigners: '',
      status: [],
      trackName: [],
      date: [],
      note: [],
    };
  }

  componentDidMount() {
    const { tasks, selected, edit } = this.props;
    const { assigners, status, name, trackName, date, note, description, start, deadline } = tasks[selected];
    this.setState({
      assigners,
      status,
      trackName,
      date,
      note,
    });

    if (edit) {
      this.setState({
        name,
        description,
        start,
        deadline,
      });
    }
  }

  saveTask = () => {
    const { saveData } = this.props;
    console.log(this.state);
    saveData('tasks', this.state);
  };

  addTask = () => {
    const { addData } = this.props;
    console.log(this.state);
    addData('tasks', this.state);
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveAssigner = () => {
    const data = [...document.querySelectorAll("input[type='checkbox']")].map((el) =>
      el.checked ? el.name : 'disabled',
    );
    const statusData = [...document.querySelectorAll("input[type='checkbox']")].map((el) =>
      el.checked ? 'active' : 'disabled',
    );

    this.setState({
      assigners: data,
      status: statusData,
    });
  };

  render() {
    const { members, closeEdit, edit } = this.props;
    const { name, description, start, deadline, assigners } = this.state;
    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button onClick={closeEdit} className='close'>
            <span>&times;</span>
          </Button>
          <form>
            <Input placeholder='Task Name' value={name} name='name' onChange={this.inputChange}>
              Task Name:
            </Input>
            <Textarea placeholder='Task Description' value={description} name='description' onChange={this.inputChange}>
              Description:
            </Textarea>
            <Input type='date' value={start} name='start' onChange={this.inputChange}>
              Start:
            </Input>
            <Input type='date' value={deadline} name='deadline' onChange={this.inputChange}>
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
