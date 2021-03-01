import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { TaskManager } from '../components/Popups/TaskManager';
import { tasksMenuItems } from '../services/constants';
import { logOutFirebase } from '../services/services';

export function Tasks({
  members,
  tasks,
  openEdit,
  closeEdit,
  addData,
  saveData,
  deleteData,
  edit,
  editData,
  openModal,
  showDrawer,
  toggle,
  selected,
}) {
  return (
    <article>
      {openModal ? (
        <TaskManager
          tasks={tasks}
          members={members}
          closeEdit={closeEdit}
          addData={addData}
          editData={editData}
          saveData={saveData}
          edit={edit}
          selected={selected}
        />
      ) : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Create' action={openEdit} styles='button tasks' />
        <Button name='Log Out' action={logOutFirebase} styles='button danger' />
      </header>
      <p className='page-name'>{`Dev Incubator Tasks (${tasks.length})`}</p>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            {tasksMenuItems.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {tasks.map(({ id, name, start, deadline }) => (
            <tr key={id} className='row'>
              <td className='name'>{name}</td>
              <td className='attention'>{start}</td>
              <td>{deadline}</td>
              <td>
                <Button
                  name='Edit'
                  action={(e) => {
                    editData(e);
                    if (showDrawer) {
                      toggle();
                    }
                  }}
                  styles='button dev'
                />
                <Button name='Delete' action={(e) => deleteData(e, 'tasks')} styles='button danger' />
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
  openEdit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  addData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  openModal: PropTypes.bool.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};
