import { useDispatch, useSelector } from 'react-redux';
import { openEdit, openConfirmation, selectItem } from '../../store/actions/modalAction';
import { Button } from '../Buttons/Button/Button';
import { convertDate } from '../../services/helpers';

export function TasksTable() {
  const dispatch = useDispatch();
  const {
    main: { tasks },
  } = useSelector((state) => state);

  const edit = (isNew, selected) => (e) => dispatch(openEdit(e, isNew, selected));

  const confirm = (page) => (e) => {
    dispatch(selectItem(e, 'selected'));
    dispatch(openConfirmation(page));
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
            <Button onClick={confirm('tasks')} className='button danger'>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
