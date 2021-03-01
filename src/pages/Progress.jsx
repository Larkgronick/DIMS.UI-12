import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { progressMenuItems } from '../services/constants';
import { logOutFirebase } from '../services/services';

export function Progress({ members, userTasks, userIndex, selected, showDrawer, toggle }) {
  const selectedUser = `${members[selected].name} ${members[selected].lastName}`;

  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Log Out' action={logOutFirebase} styles='button danger' />
      </header>
      <p className='page-name'>
        {`${selectedUser}'s Progress`}
        <span>{`(${userTasks.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            {progressMenuItems.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {userTasks.map((item, i) => (
            <tr key={item} className='row'>
              <td className='progress'>{item.name}</td>
              <td>
                {userTasks[i].trackName[userIndex].map((el) => (
                  <p>{el}</p>
                ))}
              </td>
              <td>
                {userTasks[i].note[userIndex].map((el) => (
                  <p>{el}</p>
                ))}
              </td>
              <td>
                {userTasks[i].date[userIndex].map((el) => (
                  <p>{el}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Progress.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  userTasks: PropTypes.instanceOf(Array).isRequired,
  userIndex: PropTypes.instanceOf(Array).isRequired,
  selected: PropTypes.number.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
