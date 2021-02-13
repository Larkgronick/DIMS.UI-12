import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './styles/Table.css';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { NewTask } from '../components/Popups/NewTask';
import { tasksHeaders } from '../services/constants';

export function Tasks({
  members,
  tasks,
  addTask,
  saveTask,
  deleteTask,
  editSelected,
  edit,
  modalToggle,
  selectItem,
  openModal,
  showDrawer,
  toggle,
  logOut,
  selected,
}) {
  return (
    <article>
      {openModal ? (
        <NewTask
          tasks={tasks}
          edit={edit}
          members={members}
          addTask={addTask}
          saveTask={saveTask}
          editSelected={editSelected}
          modalToggle={modalToggle}
          selectItem={selectItem}
          selected={selected}
        />
      ) : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Create' action={modalToggle} color='tasks' />
        <Button name='Log Out' action={logOut} color='danger' />
      </header>
      <p className='page-name'>
        Dev Incubator Tasks
        <span>{`(${tasks.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {tasksHeaders.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {tasks.map((item) => (
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
                <Button
                  name='Edit'
                  action={(e) => {
                    selectItem(e);
                    editSelected(e);
                  }}
                  color='dev'
                />
                <Button name='Delete' action={(e) => deleteTask(e)} color='danger' />
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
  tasks: PropTypes.instanceOf(Array).isRequired,
  addTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editSelected: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  modalToggle: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  showDrawer: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
