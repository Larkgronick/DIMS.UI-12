import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { progressMenuItems } from '../services/constants';
import { logOutFirebase } from '../services/services';

export function Progress({ members, tasks, selected, showDrawer, toggle }) {
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
        {`${selectedUser}'s Progress`}
        <span>{`(${tasksToView.length})`}</span>
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
          {tasksToView.map(({ id, note, name, date }) => (
            <tr key={id} className='row'>
              <td>
                {note[index].map((el) => (
                  <p key={el}>{name}</p>
                ))}
              </td>
              <td>
                {note[index].map((el) => (
                  <p key={el}>{el}</p>
                ))}
              </td>
              <td>
                {date[index].map((el) => (
                  <p key={el}>{el}</p>
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
  tasks: PropTypes.instanceOf(Array).isRequired,
  selected: PropTypes.number.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
