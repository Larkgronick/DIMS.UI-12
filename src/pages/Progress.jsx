import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { progressMenuItems, progressBody } from '../constants/constants';

export function Progress({ showDrawer, toggle }) {
  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
      </header>
      <p className='page-name'>
        Ivan&apos;s progress
        <span>{`(${progressBody.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {progressMenuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {progressBody.map(({ name, note, dateImg, date, buttons }) => (
            <tr className='row'>
              <th className='name'>{name}</th>
              <td>{note}</td>
              <td>
                <img className='logo' src={dateImg} alt='note-date' />
                <span>{date}</span>
              </td>
              <td>{buttons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Progress.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};
