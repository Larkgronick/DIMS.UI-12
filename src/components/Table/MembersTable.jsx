import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { getAge, convertDate } from '../../services/helpers';
import { MainDataContext } from '../../contexts/MainDataContext';
import { ModalContext } from '../../contexts/ModalContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';

export function MembersTable() {
  return (
    <MainDataContext.Consumer>
      {({ members, deleteData }) => (
        <UserTasksContext.Consumer>
          {({ showUserTasks, userData }) => {
            const isAdmin = userData.role === 'Admin';
            return (
              <ModalContext.Consumer>
                {({ selectItem, openEdit }) => (
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
                                onClick={(e) => {
                                  selectItem(e, 'selected');
                                  showUserTasks(e);
                                }}
                                className='button dev'
                              >
                                Progress
                              </Button>
                            </Link>
                            <Link to='/user-tasks'>
                              <Button
                                onClick={(e) => {
                                  selectItem(e, 'selected');
                                  showUserTasks(e);
                                }}
                                className='button tasks'
                              >
                                Tasks
                              </Button>
                            </Link>
                            {isAdmin ? (
                              <span>
                                <Button onClick={(e) => openEdit(e, 'selected')} className='button edit'>
                                  Edit
                                </Button>
                                <Button onClick={(e) => deleteData(e, 'members')} className='button danger'>
                                  Delete
                                </Button>
                              </span>
                            ) : null}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                )}
              </ModalContext.Consumer>
            );
          }}
        </UserTasksContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
