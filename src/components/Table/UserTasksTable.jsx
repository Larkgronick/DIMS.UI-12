import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function UserTasksTable() {
  return (
    <MainContext>
      {({ userTasks, userIndex, openEdit, setTaskStatus, selectItem }) => (
        <tbody className='table-body'>
          {userTasks.map((item, i) => (
            <tr key={item.id} className='row'>
              <Link to='/task-track'>
                <td className='name'>
                  <Button action={(e) => selectItem(e, 'track')} styles='link'>
                    {item.name}
                  </Button>
                </td>
              </Link>
              <td>
                <span className='attention'>{item.start}</span>
              </td>
              <td>{item.deadline}</td>
              <td>
                <span className={item.status[userIndex]}>{item.status[userIndex]}</span>
              </td>
              <td>
                <Button
                  action={(e) => {
                    selectItem(e, 'track');
                    openEdit();
                  }}
                  styles='button edit'
                >
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
