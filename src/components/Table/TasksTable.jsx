import { useDispatch, useSelector } from 'react-redux';
import { openEdit } from '../../store/actions/modalAction';
import { deleteData } from '../../store/actions/mainDataAction';
import { Button } from '../Buttons/Button/Button';
import { convertDate } from '../../services/helpers';

export function TasksTable() {
  const dispatch = useDispatch();
  const {
    main: { tasks },
  } = useSelector((state) => state);

  const edit = (isNew, selected) => {
    return (e) => dispatch(openEdit(e, isNew, selected));
  };

  const deleteTask = (page) => {
    return (e) => dispatch(deleteData(tasks, e, page));
  };

  return (
    <tbody className='table-body'>
      {tasks.map(({ id, name, start, deadline }) => (
        <tr key={id} className='row'>
          <td className='name'>{name}</td>
          <td className='attention'>{convertDate(start)}</td>
          <td>{convertDate(deadline)}</td>
          <td className='actions'>
            <Button onClick={edit(true, 'selected')} className='button dev'>
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
