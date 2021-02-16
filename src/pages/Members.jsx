import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { NewMember } from '../components/Popups/NewMember';
import { membersMenuItems } from '../services/constants';

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
        <Button name='Register' action={registerMember} styles='button dev' />
        <Button name='Log Out' action={logOut} styles='button danger' />
      </header>
      <p className='page-name'>
        Members
        <span>({members.length})</span>
      </p>
      <table className='table'>
        <thead className='table-head'>
          {membersMenuItems.map((item) => (
            <th>{item}</th>
          ))}
        </thead>
        <tbody className='table-body'>
          {members.map(({ name, direction, education, educationImg, start, startImg, age, email }) => (
            <tr className='row'>
              <th className='name'>
                <span>{name}</span>
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
              <td>
                <Button name='Progress' styles='button dev' />
                <Link to='/user-tasks'>
                  <Button name='Tasks' action={(e) => selectItem(e)} styles='button tasks' />
                </Link>
                <Button
                  name='Edit'
                  action={(e) => {
                    selectItem(e);
                    editSelected(e);
                  }}
                  styles='button edit'
                />
                <Button name='Delete' action={(e) => deleteMember(e)} styles='button danger' />
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
