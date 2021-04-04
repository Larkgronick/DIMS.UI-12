import { useDispatch, useSelector } from 'react-redux';
import { openEdit } from '../../store/actions/modalAction';
import { deleteData } from '../../store/actions/mainDataAction';
import { Button } from '../Buttons/Button/Button';

export function TasksTable() {
  const dispatch = useDispatch();
  const {
    main: { tasks },
  } = useSelector((state) => state);

  const edit = (selected) => {
    return (e) => dispatch(openEdit(e, selected));
  };

  const deleteTask = (page) => {
    return (e) => dispatch(deleteData(tasks, e, page));
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
}
