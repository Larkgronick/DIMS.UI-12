import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { usersMenuItems } from '../services/constants';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { logOutFirebase } from '../services/services';

export function UserTasks({
  tasks,
  members,
  track,
  selectItem,
  openModal,
  openEdit,
  closeEdit,
  setTaskStatus,
  showDrawer,
  toggle,
  selected,
}) {
  const selectedUser = `${members[selected].name} ${members[selected].lastName}`;
  const tasksToView = tasks.filter((el) => el.assigners.includes(members[selected].id));
  const index = tasksToView[0].assigners.indexOf(members[selected].id);
  return (
    <article>
      {openModal ? (
        <TaskTrackManager
          tasks={tasks}
          tasksToView={tasksToView}
          members={members}
          track={track}
          index={index}
          closeEdit={closeEdit}
        />
      ) : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Log Out' action={logOutFirebase} styles='button danger' />
      </header>
      <p className='page-name'>
        {`${selectedUser}'s Tasks`}
        <span>{`(${tasksToView.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            {usersMenuItems.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {tasksToView.map((item, i) => (
            <tr key={item.id} className='row'>
              <Link to='/task-track'>
                <td className='name'>{item.name}</td>
              </Link>
              <td>
                <span className='attention'>{item.start}</span>
              </td>
              <td>{item.deadline}</td>
              <td>
                <span className={item.status[index]}>{item.status[index]}</span>
              </td>
              <td>
                <Button
                  name='Track'
                  action={(e) => {
                    selectItem(e, 'track');
                    openEdit();
                  }}
                  styles='button edit'
                />
              </td>
              <td>
                <Button
                  name='Success'
                  action={() => setTaskStatus(index, tasksToView[i], 'success')}
                  styles='button dev'
                />
                <Button
                  name='Fail'
                  action={() => setTaskStatus(index, tasksToView[i], 'failed')}
                  styles='button danger'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

UserTasks.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  selectItem: PropTypes.func.isRequired,
  openEdit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  setTaskStatus: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  track: PropTypes.number.isRequired,
};
