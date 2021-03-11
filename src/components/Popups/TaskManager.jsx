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
      assigners: [],
      status: [],
      trackName: [{ items: [] }],
      date: [{ items: [] }],
      note: [{ items: [] }],
      name: '',
      description: '',
      start: '',
      deadline: '',
    };
  }

  componentDidMount() {
    const { tasks, selected, edit } = this.props;
    const { assigners, status, name, trackName, date, note, description, start, deadline } = tasks[selected];
    if (edit) {
      this.setState({
        assigners,
        status,
        name,
        trackName,
        date,
        note,
        description,
        start,
        deadline,
      });
    }
  }

  saveTask = () => {
    const { saveData } = this.props;
    saveData('tasks', this.state);
  };

  addTask = () => {
    const { addData } = this.props;
    addData('tasks', this.state);
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveAssigner = (e) => {
    const { assigners } = this.state;
    const { name, checked } = e.target;
    const newAssigners = [...assigners];

    if (checked) {
      newAssigners.push(name);
    } else {
      const index = newAssigners.indexOf(name);
      newAssigners.splice(index, 1);
    }
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
          <Button action={closeEdit} styles='close'>
            <span>&times;</span>
          </Button>
          <form action=''>
            <Input placeholder='Task Name' value={name} name='name' action={this.inputChange}>
              Task Name:
            </Input>
            <Textarea placeholder='Task Description' value={description} name='description' action={this.inputChange}>
              Description:
            </Textarea>
            <Input type='date' value={start} name='start' action={this.inputChange}>
              Start:
            </Input>
            <Input type='date' value={deadline} name='deadline' action={this.inputChange}>
              Deadline:
            </Input>
            <List
              members={members}
              assigners={assigners}
              styles='assigner'
              listId='assigners'
              action={(e) => this.saveAssigner(e)}
            >
              Assigners:
            </List>
            {edit ? (
              <Button action={this.saveTask} styles='submit'>
                Edit
              </Button>
            ) : (
              <Button action={this.addTask} styles='submit'>
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
