import { useContext } from 'react';
import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function TasksTable() {
  const context = useContext(MainContext);

  const editTask = (e) => {
    context.editData(e);
    if (context.showDrawer) {
      context.toggle();
    }
  };

  const deleteTask = (e) => {
    context.deleteData(e, 'tasks');
  };

  return (
    <MainContext>
      {({ tasks }) => (
        <tbody className='table-body'>
          {tasks.map(({ id, name, start, deadline }) => (
            <tr key={id} className='row'>
              <td className='name'>{name}</td>
              <td className='attention'>{start}</td>
              <td>{deadline}</td>
              <td>
                <Button action={editTask} styles='button dev'>
                  Edit
                </Button>
                <Button action={deleteTask} styles='button danger'>
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
