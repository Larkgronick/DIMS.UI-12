import PropTypes from 'prop-types';
import './styles/Table.scss';
import { getIndex } from '../services/helpers';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { taskTrackMenuItems } from '../services/constants';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';

import { logOutFirebase } from '../services/services';

export function TaskTrack({
  userTasks,
  userIndex,
  tasks,
  members,
  track,
  subtask,
  deleteTrackHistory,
  saveTaskData,
  selectItem,
  editTrack,
  closeEdit,
  openModal,
  showDrawer,
  toggle,
  selected,
  edit,
}) {
  const selectedUser = `${members[selected].name} ${members[selected].lastName}`;
  const taskNames = userTasks[track].trackName[userIndex];
  const taskNotes = userTasks[track].note[userIndex];
  const taskDates = userTasks[track].date[userIndex];

  return (
    <article>
      {openModal ? (
        <TaskTrackManager
          tasks={tasks}
          subtask={subtask}
          userTasks={userTasks}
          saveTaskData={saveTaskData}
          members={members}
          track={track}
          userIndex={userIndex}
          closeEdit={closeEdit}
          edit={edit}
        />
      ) : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Log Out' action={logOutFirebase} styles='button danger' />
      </header>
      <p className='page-name'>{`${selectedUser}'s Task Tracks`}</p>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            {taskTrackMenuItems.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {taskNames.map((item, i) => (
            <tr key={item} className='row'>
              <td>{item}</td>
              <td>{taskNotes[i]}</td>
              <td>{taskDates[i]}</td>
              <td>
                <Button
                  name='Edit'
                  action={(e) => {
                    selectItem(e, 'subtask');
                    editTrack();
                  }}
                  styles='button edit'
                />
              </td>
              <td>
                <Button
                  name='Delete'
                  action={(e) => {
                    deleteTrackHistory(getIndex(e));
                  }}
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

TaskTrack.propTypes = {
  userTasks: PropTypes.instanceOf(Array).isRequired,
  userIndex: PropTypes.instanceOf(Array).isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  subtask: PropTypes.number.isRequired,
  selectItem: PropTypes.func.isRequired,
  deleteTrackHistory: PropTypes.func.isRequired,
  saveTaskData: PropTypes.func.isRequired,
  editTrack: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  track: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
};
