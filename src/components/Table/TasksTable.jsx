import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function TasksTable() {
  return (
    <MainContext>
      {({ tasks, openEdit, deleteData }) => {
        return (
          <tbody className='table-body'>
            {tasks.map(({ id, name, start, deadline }) => (
              <tr key={id} className='row'>
                <td className='name'>{name}</td>
                <td className='attention'>{start}</td>
                <td>{deadline}</td>
                <td>
                  <Button onClick={(e) => openEdit(e, true)} className='button dev'>
                    Edit
                  </Button>
                  <Button onClick={(e) => deleteData(e, 'tasks')} className='button danger'>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        );
      }}
    </MainContext>
  );
}
