import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { NewTask } from '../components/Popups/NewTask';
import { tasksMenuItems } from '../services/constants';

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
        <Button name='Create' action={modalToggle} styles='button tasks' />
        <Button name='Log Out' action={logOut} styles='button danger' />
      </header>
      <p className='page-name'>
        Dev Incubator Tasks
        <span>({tasks.length})</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {tasksMenuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {tasks.map(({ name, start, startImg, deadline, deadlineImg }) => (
            <tr className='row'>
              <th className='name'>{name}</th>
              <td>
                <img className='logo' src={startImg} alt='start' />
                <span className='attention'>{start}</span>
              </td>
              <td>
                <img className='logo' src={deadlineImg} alt='deadline' />
                <span>{deadline}</span>
              </td>
              <td>
                <Button
                  name='Edit'
                  action={(e) => {
                    selectItem(e);
                    editSelected(e);
                  }}
                  styles='button dev'
                />
                <Button name='Delete' action={(e) => deleteTask(e)} styles='button danger' />
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
