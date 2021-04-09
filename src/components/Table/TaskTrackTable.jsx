import { useDispatch, useSelector } from 'react-redux';
import { openEdit, selectItem, openConfirmation } from '../../store/actions/modalAction';
import { Button } from '../Buttons/Button/Button';
import { convertDate } from '../../services/helpers';

export function TaskTrackTable() {
  const dispatch = useDispatch();
  const {
    modal: { track },
    user: { userTracks },
  } = useSelector((state) => state);

  const { trackName, note, date } = userTracks[track];

  const edit = (isNew, selected) => (e) => dispatch(openEdit(e, isNew, selected));

  const confirm = (page) => (e) => {
    dispatch(selectItem(e, 'subtask'));
    dispatch(openConfirmation(page));
  };

  return (
    <tbody className='table-body'>
      {trackName.map((el, i) => (
        <tr key={el} className='row'>
          <td className='task-tracks-adapt'>{trackName[i]}</td>
          <td className='task-tracks-adapt'>{note[i]}</td>
          <td className='task-tracks-adapt'>{convertDate(date[i])}</td>
          <td className='task-tracks-adapt actions'>
            <Button onClick={edit(true, 'subtask')} className='button edit'>
              Edit
            </Button>
            <Button onClick={confirm('user-tracks')} className='button danger'>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
