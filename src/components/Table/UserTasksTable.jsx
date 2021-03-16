import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { ErrorRow } from './ErrorRow';
import { MainContext } from '../../services/context';

export function UserTasksTable() {
  return (
    <MainContext.Consumer>
      {(context) => {
        const { error, userTasks, userIndex, setTaskStatus, selectItem, openEdit } = context;
        if (error) {
          return <ErrorRow page='tasks' />;
        }
        return (
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
                  <span className={item.status[userIndex]}>{item.status[userIndex]}</span>
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
                  <Button onClick={() => setTaskStatus(userIndex, userTasks[i], 'success')} className='button dev'>
                    Success
                  </Button>
                  <Button onClick={() => setTaskStatus(userIndex, userTasks[i], 'failed')} className='button danger'>
                    Fail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        );
      }}
    </MainContext.Consumer>
  );
}
