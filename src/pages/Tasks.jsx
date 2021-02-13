import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { tasksMenuItems, tasksBody } from '../constants/constants';

export function Tasks(props) {
  const { showDrawer, toggle } = props;
  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Tasks' styles='button' />
      </header>
      <p className='page-name'>
        Tasks
        <span>{`(${tasksBody.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {tasksMenuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {tasksBody.map(({ name, start, startImg, deadline, deadlineImg, buttons }) => (
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
              <td>{buttons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Tasks.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};
