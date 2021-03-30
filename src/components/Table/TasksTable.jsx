import { Button } from '../Buttons/Button/Button';
import { MainDataContext } from '../../contexts/MainDataContext';
import { ModalContext } from '../../contexts/ModalContext';

export function TasksTable() {
  return (
    <MainDataContext.Consumer>
      {({ tasks, deleteData }) => (
        <ModalContext.Consumer>
          {({ openEdit }) => (
            <tbody className='table-body'>
              {tasks.map(({ id, name, start, deadline }) => (
                <tr key={id} className='row'>
                  <td className='name'>{name}</td>
                  <td className='attention'>{start}</td>
                  <td>{deadline}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        openEdit(e, 'selected');
                      }}
                      className='button dev'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => {
                        deleteData(e, 'tasks');
                      }}
                      className='button danger'
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </ModalContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
