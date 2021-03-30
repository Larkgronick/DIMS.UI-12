import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { MainDataContext } from '../../contexts/MainDataContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import { ModalContext } from '../../contexts/ModalContext';
import { getIndex } from '../../services/helpers';

export function UserTasksTable() {
  return (
    <MainDataContext.Consumer>
      {({ userData }) => (
        <UserTasksContext.Consumer>
          {({ userTasks, userTracks, setTaskStatus }) => (
            <ModalContext.Consumer>
              {({ openEdit, selectItem }) => {
                const isMember = userData.role === 'Member';
                const renderActions = (memberRole, i) => {
                  if (!memberRole) {
                    return (
                      <>
                        <Button onClick={(e) => setTaskStatus(getIndex(e), 'success', i)} className='button dev'>
                          Success
                        </Button>
                        <Button onClick={(e) => setTaskStatus(getIndex(e), 'failed', i)} className='button danger'>
                          Fail
                        </Button>
                      </>
                    );
                  }
                  return null;
                };
                return (
                  <tbody className='table-body'>
                    {userTasks.map(({ id, name, start, deadline }, i) => (
                      <tr key={id} className='row'>
                        <td>
                          {isMember ? (
                            <Link to='/task-track'>
                              <Button onClick={(e) => selectItem(e, 'track')} className='link'>
                                {name}
                              </Button>
                            </Link>
                          ) : (
                            <span>{name}</span>
                          )}
                        </td>
                        <td>
                          <span className='attention'>{start}</span>
                        </td>
                        <td>{deadline}</td>
                        <td>
                          <span className={userTracks[i].status}>{userTracks[i].status}</span>
                        </td>

                        <td>
                          {isMember ? (
                            <Button
                              onClick={(e) => {
                                selectItem(e, 'track');
                                openEdit();
                              }}
                              className='button edit'
                            >
                              Track
                            </Button>
                          ) : (
                            <span />
                          )}
                        </td>
                        <td>{renderActions(isMember, i)}</td>
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
