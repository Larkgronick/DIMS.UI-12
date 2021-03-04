import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function TasksTable() {
  return (
    <MainContext>
      {({ tasks, showDrawer, toggle, editData, deleteData }) => (
        <tbody className='table-body'>
          {tasks.map(({ id, name, start, deadline }) => (
            <tr key={id} className='row'>
              <td className='name'>{name}</td>
              <td className='attention'>{start}</td>
              <td>{deadline}</td>
              <td>
                <Button
                  action={(e) => {
                    editData(e);
                    if (showDrawer) {
                      toggle();
                    }
                  }}
                  styles='button dev'
                >
                  Edit
                </Button>
                <Button action={(e) => deleteData(e, 'tasks')} styles='button danger'>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </MainContext>
  );
}
