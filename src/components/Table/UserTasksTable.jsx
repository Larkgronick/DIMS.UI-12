import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { MainDataContext } from '../../contexts/MainDataContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import { ModalContext } from '../../contexts/ModalContext';
import { getIndex } from '../../services/helpers';

export function UserTasksTable() {
  return (
    <MainDataContext.Consumer>
      {({ role }) => (
        <UserTasksContext.Consumer>
          {({ userTasks, userTracks, setTaskStatus }) => (
            <ModalContext.Consumer>
              {({ openEdit, selectItem }) => {
                const isMember = role === 'Member';

                const renderActions = (memberRole, i) => {
                  if (!memberRole) {
                    return (
                      <>
                        <Button onClick={set('success', i)} className='button dev'>
                          Success
                        </Button>
                        <Button onClick={set('failed', i)} className='button danger'>
                          Fail
                        </Button>
                      </>
                    );
                  }
                  return null;
                };

                const select = (track) => {
                  return (e) => selectItem(e, track);
                };

                const set = (status, index) => {
                  return (e) => setTaskStatus(getIndex(e), status, index);
                };

                const edit = (track) => {
                  return (e) => {
                    selectItem(e, track);
                    openEdit();
                  };
                };

                return (
                  <tbody className='table-body'>
                    {userTasks.map(({ id, name, start, deadline }, i) => (
                      <tr key={id} className='row'>
                        <td>
                          {isMember ? (
                            <Link to='/task-track'>
                              <Button onClick={select('track')} className='link'>
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
                        {isMember ? (
                          <td>
                            <Button onClick={edit('track')} className='button edit'>
                              Track
                            </Button>
                          </td>
                        ) : null}
                        {!isMember ? <td className='actions'>{renderActions(isMember, i)}</td> : null}
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
