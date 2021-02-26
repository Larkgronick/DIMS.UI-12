import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { usersMenuItems } from '../services/constants';
import { logOutFirebase } from '../services/services';

export function UserTasks({ tasks, members, setTaskStatus, showDrawer, toggle, selected }) {
  const selectedUser = `${members[selected].name} ${members[selected].lastName}`;
  const tasksToView = tasks.filter((el) => el.assigners.includes(members[selected].id));
  const index = tasksToView[0].assigners.indexOf(members[selected].id);
  return (
    <article>
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
              <td className='name'>{item.name}</td>
              <td>
                <span className='attention'>{item.start}</span>
              </td>
              <td>{item.deadline}</td>
              <td>
                <span className={item.status[index]}>{item.status[index]}</span>
              </td>
              <td>
                <Link to='/task-track'>
                  <Button name='Track' styles='button edit' />
                </Link>
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
  setTaskStatus: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};
