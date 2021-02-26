import PropTypes from 'prop-types';
import './styles/Table.scss';
import { getIndex } from '../services/helpers';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { taskTrackMenuItems } from '../services/constants';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';

import { logOutFirebase } from '../services/services';

export function TaskTrack({
  tasks,
  members,
  track,
  deleteTrackHistory,
  selectItem,
  openEdit,
  closeEdit,
  openModal,
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
        {`${selectedUser}'s Task Tracks`}
        <span>{`(${tasksToView.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            {taskTrackMenuItems.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {tasksToView.map(({ id, name, note, date }) => (
            <tr key={id} className='row'>
              <td className='name'>{name}</td>
              <td>
                <span>{note[index][note[index].length - 1]}</span>
              </td>
              <td>
                <span>{date[index][date[index].length - 1]}</span>
              </td>
              <td>
                <Button
                  name='Edit'
                  action={(e) => {
                    selectItem(e, 'track');
                    openEdit();
                  }}
                  styles='button edit'
                />
                <Button
                  name='Delete'
                  action={(e) => {
                    deleteTrackHistory(tasksToView[getIndex(e)], index);
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
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  selectItem: PropTypes.func.isRequired,
  deleteTrackHistory: PropTypes.func.isRequired,
  openEdit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  track: PropTypes.number.isRequired,
};
