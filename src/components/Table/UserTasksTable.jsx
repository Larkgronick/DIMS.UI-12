import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import { ModalContext } from '../../contexts/ModalContext';
import { getIndex } from '../../services/helpers';

export function UserTasksTable() {
  return (
    <UserTasksContext.Consumer>
      {({ userTasks, userData, userTracks, setTaskStatus }) => (
        <ModalContext.Consumer>
          {({ openEdit, selectItem }) => {
            const isMember = userData.role === 'Member';
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
                    <td>
                      <Button onClick={(e) => setTaskStatus(getIndex(e), 'success', i)} className='button dev'>
                        Success
                      </Button>
                      <Button onClick={(e) => setTaskStatus(getIndex(e), 'failed', i)} className='button danger'>
                        Fail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserTasksContext.Consumer>
  );
}
