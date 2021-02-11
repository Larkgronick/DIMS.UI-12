import PropTypes from 'prop-types';
import './styles/Table.css';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { NewTask } from '../components/Popups/NewTask';
import { tasksHeaders } from '../services/constants';

export function Tasks({ members, addTask, modalToggle, openModal, showDrawer, toggle, logOut, selected }) {
  const tasks = members.map((el) => el.tasks);
  return (
    <article>
      {openModal ? <NewTask addTask={addTask} modalToggle={modalToggle} /> : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Create' action={modalToggle} color='tasks' />
        <Button name='Log Out' action={logOut} color='danger' />
      </header>
      <p className='page-name'>
        {`${members[selected].name}'s Tasks`}
        <span>{`(${tasks[selected].length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {tasksHeaders.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {tasks[selected].map((item) => (
            <tr className='row'>
              <th className='name'>{item.name}</th>
              <td>
                <img className='logo' src={item.start_img} alt='start' />
                <span className='attention'>{item.start}</span>
              </td>
              <td>
                <img className='logo' src={item.deadline_img} alt='deadline' />
                <span>{item.deadline}</span>
              </td>
              <td>
                <Button name='Edit' action={console.log(1)} color='edit' />
                <Button name='Delete' action={console.log(1)} color='danger' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Tasks.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  addTask: PropTypes.func.isRequired,
  modalToggle: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  showDrawer: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
