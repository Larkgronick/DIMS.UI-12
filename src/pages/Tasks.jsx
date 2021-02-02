import PropTypes from 'prop-types';

import './styles/Table.css';

import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';

import startIcon from '../assets/images/startIcon.png';
import deadlineIcon from '../assets/images/deadlineIcon.png';

const pageName = 'Tasks';
const menuItems = ['Name', 'Start', 'Deadline', 'Actions'];
const TasksBody = [
  {
    name: 'Create the DB',
    start: '28.01.2021',
    start_img: startIcon,
    deadline: '28.01.2021',
    deadline_img: deadlineIcon,
    buttons: 'buttons',
  },
  {
    name: 'Implement the props',
    start: '28.01.2021',
    start_img: startIcon,
    deadline: '28.01.2021',
    deadline_img: deadlineIcon,
    buttons: 'buttons',
  },
];

export function Tasks(props) {
  const { showDrawer, toggle } = props;
  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name={pageName} />
      </header>
      <p className='page-name'>
        {pageName}
        <span>{`(${TasksBody.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {menuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {TasksBody.map((item) => (
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
              <td>{item.buttons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Tasks.propTypes = {
  showDrawer: PropTypes.func,
  toggle: PropTypes.bool,
};

Tasks.defaultProps = {
  showDrawer: PropTypes.func,
  toggle: PropTypes.bool,
};
