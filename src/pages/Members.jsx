import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { membersMenuItems, membersBody } from '../constants/constants';

export function Members({ showDrawer, toggle }) {
  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Members' styles='button' />
      </header>
      <p className='page-name'>
        Members
        <span>{`(${membersBody.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {membersMenuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {membersBody.map(({ name, direction, education, educationImg, start, startImg, age, email, buttons }) => (
            <tr className='row'>
              <th className='name'>
                {name}
                <span className='attention'>{direction}</span>
              </th>
              <td>
                <img className='logo' src={educationImg} alt='education' />
                <span>{education}</span>
              </td>
              <td>
                <img className='logo' src={startImg} alt='education' />
                <span className='attention'>{start}</span>
              </td>
              <td>{age}</td>
              <td>{email}</td>
              <td>{buttons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Members.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};
