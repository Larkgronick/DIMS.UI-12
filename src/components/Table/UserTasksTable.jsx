import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { ErrorRow } from './ErrorRow';
import { MainContext } from '../../services/context';

export function UserTasksTable() {
  const context = useContext(MainContext);
  const { error } = context;
  const addTrack = (e) => {
    context.selectItem(e, 'track');
    context.openEdit();
  };

  return (
    <MainContext>
      {error
        ? () => <ErrorRow page='tasks' />
        : ({ userTasks, userIndex, setTaskStatus, selectItem }) => (
            <tbody className='table-body'>
              {userTasks.map((item, i) => (
                <tr key={item.id} className='row'>
                  <td>
                    <Link to='/task-track'>
                      <Button className='task-link' action={(e) => selectItem(e, 'track')} styles='link'>
                        {item.name}
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <span className='attention'>{item.start}</span>
                  </td>
                  <td>{item.deadline}</td>
                  <td>
                    <span className={item.status[userIndex]}>{item.status[userIndex]}</span>
                  </td>
                  <td>
                    <Button action={(e) => addTrack(e)} styles='button edit'>
                      Track
                    </Button>
                  </td>
                  <td>
                    <Button action={() => setTaskStatus(userIndex, userTasks[i], 'success')} styles='button dev'>
                      Success
                    </Button>
                    <Button action={() => setTaskStatus(userIndex, userTasks[i], 'failed')} styles='button danger'>
                      Fail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
    </MainContext>
  );
}
