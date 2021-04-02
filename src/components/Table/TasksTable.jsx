import { Button } from '../Buttons/Button/Button';
import { MainDataContext } from '../../contexts/MainDataContext';
import { ModalContext } from '../../contexts/ModalContext';

export function TasksTable() {
  return (
    <MainDataContext.Consumer>
      {({ tasks, deleteData }) => (
        <ModalContext.Consumer>
          {({ openEdit }) => {
            const edit = (selected) => {
              return (e) => openEdit(e, selected);
            };
            const deleteTask = (page) => {
              return (e) => deleteData(e, page);
            };
            return (
              <tbody className='table-body'>
                {tasks.map(({ id, name, start, deadline }) => (
                  <tr key={id} className='row'>
                    <td className='name'>{name}</td>
                    <td className='attention'>{start}</td>
                    <td>{deadline}</td>
                    <td className='actions'>
                      <Button onClick={edit('selected')} className='button dev'>
                        Edit
                      </Button>
                      <Button onClick={deleteTask('tasks')} className='button danger'>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          }}
        </ModalContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
