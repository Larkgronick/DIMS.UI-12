import PropTypes from 'prop-types';
import './styles/Table.css';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import educationIcon from '../assets/images/educationIcon.png';
import startIcon from '../assets/images/startIcon.png';

const pageName = 'Members';
const menuItems = ['Name / Direction', 'Education', 'Start', 'Age', 'Email', 'Actions'];
const membersBody = [
  {
    name: 'Create the DB',
    direction: 'JAVA',
    education: 'BSUIR',
    education_img: educationIcon,
    start: '28.01.2021',
    start_img: startIcon,
    age: '21',
    e_mail: 'johndoe@design.com',
    buttons: 'buttons',
  },
  {
    name: 'Petya Petrow',
    direction: '.NET',
    education: 'BSU',
    education_img: educationIcon,
    start: '30.01.2021',
    start_img: startIcon,
    age: '22',
    e_mail: 'johndoe2@design.com',
    buttons: 'buttons',
  },
];

export function Members({ showDrawer, toggle }) {
  return (
    <article>
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name={pageName} />
      </header>
      <p className='page-name'>
        {pageName}
        <span>{`(${membersBody.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {menuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {membersBody.map((item) => (
            <tr className='row'>
              <th className='name'>
                {item.name}
                <span className='attention'>{item.direction}</span>
              </th>
              <td>
                <img className='logo' src={item.education_img} alt='education' />
                <span>{item.education}</span>
              </td>
              <td>
                <img className='logo' src={item.start_img} alt='education' />
                <span className='attention'>{item.start}</span>
              </td>
              <td>{item.age}</td>
              <td>{item.e_mail}</td>
              <td>{item.buttons}</td>
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
