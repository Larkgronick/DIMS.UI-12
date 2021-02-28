import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';

export class TaskManager extends PureComponent {
  constructor(props) {
    super(props);
    const { tasks, selected, edit } = this.props;
    const { assigners, status, name, description, start, deadline } = tasks[selected];
    if (edit) {
      this.state = {
        assigners,
        status,
        name,
        description,
        start,
        deadline,
      };
    } else {
      this.state = {
        assigners: [],
        status: [],
        name: '',
        description: '',
        start: '',
        deadline: '',
      };
    }
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveAssigner = (e) => {
    const { assigners, status } = this.state;
    const { name, checked } = e.target;
    if (checked) {
      assigners.push(name);
      status.push('active');
    } else {
      const index = assigners.indexOf(name);
      assigners.splice(index, 1);
      status.splice(index, 1);
    }
  };

  render() {
    const { members, closeEdit, edit, addData, saveData } = this.props;
    const { name, description, start, deadline, assigners } = this.state;
    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button name={<span>&times;</span>} action={closeEdit} styles='close' />
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
                {members.map(({ name: firstName, id, lastName }) => (
                  <li key={id} className='assigner'>
                    <input
                      defaultChecked={assigners.includes(id)}
                      type='checkbox'
                      value='true'
                      name={id}
                      onChange={(e) => this.saveAssigner(e)}
                    />
                    {`${firstName} ${lastName}`}
                  </li>
                ))}
              </ul>
            </label>
            {edit ? (
              <Button
                name='Edit'
                action={(e) => {
                  saveData('tasks', this.state);
                }}
                styles='submit'
              />
            ) : (
              <Button name='Create' action={() => addData('tasks', this.state)} styles='submit' />
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
