import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import { ModalContext } from '../../contexts/ModalContext';
import { getIndex } from '../../services/helpers';

export function UserTasksTable() {
  return (
    <UserTasksContext.Consumer>
      {({ userTasks, userTracks, setTaskStatus }) => (
        <ModalContext.Consumer>
          {({ openEdit, selectItem }) => (
            <tbody className='table-body'>
              {userTasks.map((item, i) => (
                <tr key={item.id} className='row'>
                  <td>
                    <Link to='/task-track'>
                      <Button onClick={(e) => selectItem(e, 'track')} className='link'>
                        {item.name}
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <span className='attention'>{item.start}</span>
                  </td>
                  <td>{item.deadline}</td>
                  <td>
                    <span className={userTracks[i].status}>{userTracks[i].status}</span>
                  </td>
                  <td>
                    <Button
                      onClick={(e) => {
                        selectItem(e, 'track');
                        openEdit();
                      }}
                      className='button edit'
                    >
                      Track
                    </Button>
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
          )}
        </ModalContext.Consumer>
      )}
    </UserTasksContext.Consumer>
  );
}
