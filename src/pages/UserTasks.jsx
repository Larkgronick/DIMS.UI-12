import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { usersMenuItems } from '../services/constants';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { logOutFirebase } from '../services/services';

export function UserTasks({
  userTasks,
  userIndex,
  tasks,
  members,
  track,
  addTaskData,
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

  return (
    <article>
      {openModal ? (
        <TaskTrackManager
          tasks={tasks}
          userTasks={userTasks}
          members={members}
          track={track}
          userIndex={userIndex}
          addTaskData={addTaskData}
          closeEdit={closeEdit}
        />
      ) : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button action={logOutFirebase} styles='button danger'>
          Log Out
        </Button>
      </header>
      <p className='page-name'>
        {`${selectedUser}'s Tasks`}
        <span>{`(${userTasks.length})`}</span>
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
          {userTasks.map((item, i) => (
            <tr key={item.id} className='row'>
              <Link to='/task-track'>
                <td className='name'>
                  <Button action={(e) => selectItem(e, 'track')} styles='link'>
                    {item.name}
                  </Button>
                </td>
              </Link>
              <td>
                <span className='attention'>{item.start}</span>
              </td>
              <td>{item.deadline}</td>
              <td>
                <span className={item.status[userIndex]}>{item.status[userIndex]}</span>
              </td>
              <td>
                <Button
                  action={(e) => {
                    selectItem(e, 'track');
                    openEdit();
                  }}
                  styles='button edit'
                >
                  Track
                </Button>
              </td>
              <td>
                <Button action={() => setTaskStatus(userIndex, userTasks[i], 'success')} styles='button dev'>
                  Success
                </Button>
                <Button action={() => setTaskStatus(userIndex, userTasks[i], 'failed')} styles='button danger'>
                  Fail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

UserTasks.propTypes = {
  userTasks: PropTypes.instanceOf(Array).isRequired,
  userIndex: PropTypes.number.isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  addTaskData: PropTypes.func.isRequired,
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
