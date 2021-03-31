import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { convertDate } from '../../services/helpers';
import { MainDataContext } from '../../contexts/MainDataContext';
import { ModalContext } from '../../contexts/ModalContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';

export function MembersTable() {
  return (
    <MainDataContext.Consumer>
      {({ role, members, deleteData }) => (
        <UserTasksContext.Consumer>
          {({ showUserTasks }) => (
            <ModalContext.Consumer>
              {({ openEdit }) => {
                const isAdmin = role === 'Admin';
                const edit = (selected) => {
                  return (e) => openEdit(e, selected);
                };
                const deleteMember = (page) => {
                  return (e) => deleteData(e, page);
                };
                return (
                  <tbody className='table-body'>
                    {members.map(({ id, name, lastName, direction, email, education, mobilePhone, startDate }) => (
                      <tr key={id} className='row'>
                        <td>
                          <span>{`${name} ${lastName}`}</span>
                          <span className='attention'>{` ${direction}`}</span>
                        </td>
                        <td>{email}</td>
                        <td>{education}</td>
                        <td>{mobilePhone}</td>
                        <td>{convertDate(startDate)}</td>
                        <td className='actions'>
                          <Link to='/progress'>
                            <Button onClick={showUserTasks} className='button dev'>
                              Progress
                            </Button>
                          </Link>
                          <Link to='/user-tasks'>
                            <Button onClick={showUserTasks} className='button tasks'>
                              Tasks
                            </Button>
                          </Link>
                          {isAdmin ? (
                            <span>
                              <Button onClick={edit('selected')} className='button edit'>
                                Edit
                              </Button>
                              <Button onClick={deleteMember('members')} className='button danger'>
                                Delete
                              </Button>
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                );
              }}
            </ModalContext.Consumer>
          )}
        </UserTasksContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
