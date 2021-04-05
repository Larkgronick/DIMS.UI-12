import { useDispatch, useSelector } from 'react-redux';
import { openEdit } from '../../store/actions/modalAction';
import { saveTrackData } from '../../store/actions/userDataAction';
import { Button } from '../Buttons/Button/Button';
import { getIndex, convertDate } from '../../services/helpers';

export function TaskTrackTable() {
  const dispatch = useDispatch();
  const {
    modal: { track },
    user: { userTracks },
  } = useSelector((state) => state);

  const { trackName, note, date } = userTracks[track];

  const edit = (isNew, selected) => {
    return (e) => dispatch(openEdit(e, isNew, selected));
  };

  const deleteTrack = (e) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      return dispatch(saveTrackData(userTracks, {}, track, getIndex(e), 'delete'));
    }
    return null;
  };

  return (
    <tbody className='table-body'>
      {trackName.map((el, i) => (
        <tr key={el} className='row'>
          <td>{trackName[i]}</td>
          <td>{note[i]}</td>
          <td>{convertDate(date[i])}</td>
          <td>
            <Button onClick={edit(true, 'subtask')} className='button edit'>
              Edit
            </Button>
            <Button onClick={deleteTrack} className='button danger'>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
