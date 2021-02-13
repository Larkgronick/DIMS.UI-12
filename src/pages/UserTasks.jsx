import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './styles/Table.css';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { usersTasksHeaders } from '../services/constants';

export function UserTasks({ tasks, members, showDrawer, toggle, logOut, selected }) {
  const member = members[selected].name;
  console.log(member);
  const userTasks = tasks.map((el) => el.assigners);
  console.log(userTasks);
  const userTasksTwo = userTasks.map((el) => el.name);

  console.log(userTasksTwo);
  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Log Out' action={logOut} color='danger' />
      </header>
      <p className='page-name'>
        {`${members[selected].name}'s Tasks`}
        <span>{`(${userTasks.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {usersTasksHeaders.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {userTasks.map((item) => (
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
                <span className={item.status}>{item.status}</span>
              </td>
              <td>
                <Button name='Track' action={console.log(1)} color='edit' />
              </td>
              <td>
                <Button name='Success' action={console.log(1)} color='dev' />
                <Button name='Fail' action={console.log(1)} color='danger' />
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
  showDrawer: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
