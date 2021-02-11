import PropTypes from 'prop-types';

import './styles/Table.css';

import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';

import startIcon from '../assets/images/startIcon.png';

const memberName = 'Ivan';
const pageName = 'Progress';

const menuItems = ['Name', 'Start', 'Deadline', 'Actions'];
const ProgressBody = [
  {
    name: 'Create the DB',
    note: 'Implemented the TaskState table',
    date: '28.01.2021',
    date_img: startIcon,
    buttons: 'buttons',
  },
  {
    name: 'Create the DB',
    note: 'Created the Member view',
    date: '29.01.2021',
    date_img: startIcon,
    buttons: 'buttons',
  },
  {
    name: 'Implement the props',
    note: 'Implemented the calc progress proc',
    date: '30.01.2021',
    date_img: startIcon,
    buttons: 'buttons',
  },
];

export function Progress({ showDrawer, toggle, logOut }) {
  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <button onClick={logOut} type='button'>
          Log Out
        </button>
      </header>
      <p className='page-name'>
        {`${memberName}'s ${pageName}`}
        <span>{`(${ProgressBody.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {menuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {ProgressBody.map((item) => (
            <tr className='row'>
              <th className='name'>{item.name}</th>
              <td>{item.note}</td>
              <td>
                <img className='logo' src={item.date_img} alt='note-date' />
                <span>{item.date}</span>
              </td>
              <td>{item.buttons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Progress.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};
