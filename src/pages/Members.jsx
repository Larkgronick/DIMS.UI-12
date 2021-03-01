import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Table.scss';
import { Hamburger } from '../components/Buttons/Hamburger/Hamburger';
import { Button } from '../components/Buttons/Button/Button';
import { MemberManager } from '../components/Popups/MemberManager';
import { membersMenuItems } from '../services/constants';
import { getAge, convertDate } from '../services/helpers';
import { logOutFirebase } from '../services/services';

export function Members({
  members,
  openEdit,
  closeEdit,
  addData,
  editData,
  saveData,
  deleteData,
  showUserTasks,
  edit,
  openModal,
  showDrawer,
  toggle,
  selectItem,
  selected,
}) {
  return (
    <article>
      {openModal ? (
        <MemberManager
          members={members}
          closeEdit={closeEdit}
          addData={addData}
          editData={editData}
          saveData={saveData}
          edit={edit}
          selected={selected}
        />
      ) : null}
      <header className='header'>
        <Hamburger showDrawer={showDrawer} toggle={toggle} />
        <Button name='Register' action={openEdit} styles='button dev' />
        <Button name='Log Out' action={logOutFirebase} styles='button danger' />
      </header>
      <p className='page-name'>{`Members (${members.length})`}</p>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            {membersMenuItems.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {members.map(
            ({
              id,
              name,
              lastName,
              direction,
              birthDate,
              email,
              sex,
              education,
              universityAverageScore,
              mathScore,
              address,
              mobilePhone,
              startDate,
              skype,
            }) => (
              <tr key={id} className='row'>
                <td className='name'>
                  <span>{`${name} ${lastName}`}</span>
                  <span className='attention'>{direction}</span>
                </td>
                <td>{email}</td>
                <td>{sex}</td>
                <td>{education}</td>
                <td>{getAge(birthDate)}</td>
                <td>{universityAverageScore}</td>
                <td>{mathScore}</td>
                <td>{address}</td>
                <td>{mobilePhone}</td>
                <td>{skype}</td>
                <td>{convertDate(startDate)}</td>
                <td>
                  <Link to='/progress'>
                    <Button
                      name='Progress'
                      action={(e) => {
                        showUserTasks(e);
                        selectItem(e, 'selected');
                      }}
                      styles='button dev'
                    />
                  </Link>
                  <Link to='/user-tasks'>
                    <Button
                      name='Tasks'
                      action={(e) => {
                        showUserTasks(e);
                      }}
                      styles='button tasks'
                    />
                  </Link>
                  <Button
                    name='Edit'
                    action={(e) => {
                      editData(e);
                    }}
                    styles='button edit'
                  />
                  <Button name='Delete' action={(e) => deleteData(e, 'members')} styles='button danger' />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </article>
  );
}

Members.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  openEdit: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  addData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  showUserTasks: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  openModal: PropTypes.bool.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};
