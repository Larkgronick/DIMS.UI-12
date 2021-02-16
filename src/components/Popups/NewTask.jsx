import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import startIcon from '../../assets/images/startIcon.png';
import deadlineIcon from '../../assets/images/deadlineIcon.png';

export class NewTask extends PureComponent {
  constructor(props) {
    super(props);
    const { tasks, selected, edit } = this.props;
    if (edit) {
      this.state = {
        assigners: tasks[selected].assigners,
        name: tasks[selected].name,
        description: tasks[selected].description,
        start: tasks[selected].start,
        startImg: startIcon,
        deadline: tasks[selected].deadline,
        deadlineImg: deadlineIcon,
      };
    } else {
      this.state = {
        assigners: [],
        name: '',
        description: '',
        start: '',
        startImg: startIcon,
        deadline: '',
        deadlineImg: deadlineIcon,
      };
    }
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveAssigner = (e) => {
    const { assigners } = this.state;
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      assigners.push({ name: item, status: 'active' });
    } else {
      const removed = assigners.filter((el) => el.name === item);
      this.setState({
        assigners: removed,
      });
    }
  };

  render() {
    const { members, modalToggle, edit, addTask, saveTask } = this.props;
    const { name, description, start, deadline, assigners } = this.state;
    const candidates = members.map((el) => el.name);
    console.log(assigners);
    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button name={<span>&times;</span>} action={modalToggle} styles='close' />
          <form action=''>
            <label htmlFor='name-field'>
              Task Name:
              <input id='name-field' name='name' placeholder='Task Name' value={name} onChange={this.inputChange} />
            </label>
            <label htmlFor='description-field'>
              Description:
              <textarea
                id='description-field'
                name='description'
                placeholder='Task Description'
                readOnly={false}
                value={description}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='start'>
              Start:
              <input id='start' name='start' type='date' value={start} onChange={this.inputChange} />
            </label>
            <label htmlFor='deadline'>
              Deadline:
              <input id='deadline' name='deadline' type='date' value={deadline} onChange={this.inputChange} />
            </label>
            <label htmlFor='assigners'>
              Assigners:
              <ul id='assigners'>
                {candidates.map((item) => (
                  <li className='assigner'>
                    <input
                      defaultChecked={assigners.map((el) => el.name).includes(item)}
                      type='checkbox'
                      value='true'
                      name={item}
                      onChange={(e) => this.saveAssigner(e)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </label>
            {edit ? (
              <Button
                name='Edit'
                action={(e) => {
                  saveTask(this.state);
                }}
                styles='submit'
              />
            ) : (
              <Button
                name='Create'
                action={() => {
                  addTask(this.state);
                }}
                styles='submit'
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}

NewTask.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  edit: PropTypes.bool.isRequired,
  modalToggle: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};
