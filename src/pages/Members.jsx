import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Table.css';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { NewMember } from '../components/Popups/NewMember';

import { membersHeaders } from '../services/constants';

export function Members({
  members,
  registerMember,
  addMember,
  editSelected,
  saveMember,
  deleteMember,
  edit,
  modalToggle,
  selectItem,
  openModal,
  showDrawer,
  toggle,
  logOut,
  selected,
}) {
  return (
    <article>
      {openModal ? (
        <NewMember
          members={members}
          edit={edit}
          addMember={addMember}
          editSelected={editSelected}
          saveMember={saveMember}
          modalToggle={modalToggle}
          selected={selected}
        />
      ) : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Register' action={registerMember} color='dev' />
        <Button name='Log Out' action={logOut} color='danger' />
      </header>
      <p className='page-name'>
        Members
        <span>{`(${members.length})`}</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {membersHeaders.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {members.map((item) => (
            <tr className='row'>
              <th className='name'>
                <span>{item.name}</span>
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
              <td>{item.email}</td>
              <td>
                <Button name='Progress' color='dev' />
                <Link to='/user-tasks'>
                  <Button name='Tasks' action={(e) => selectItem(e)} color='tasks' />
                </Link>
                <Button
                  name='Edit'
                  action={(e) => {
                    selectItem(e);
                    editSelected(e);
                  }}
                  color='edit'
                />
                <Button name='Delete' action={(e) => deleteMember(e)} color='danger' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

Members.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  registerMember: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  editSelected: PropTypes.func.isRequired,
  saveMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  modalToggle: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  showDrawer: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
