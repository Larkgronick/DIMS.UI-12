import './style/Popup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeEdit } from '../../store/actions/modalAction';
import { deleteData } from '../../store/actions/mainDataAction';
import { saveTrackData } from '../../store/actions/userDataAction';
import { Button } from '../Buttons/Button/Button';

export function Confirm() {
  const dispatch = useDispatch();

  const {
    main: { theme, tasks, members },
    modal: { selected, page, track, subtask },
    user: { userTracks },
  } = useSelector((state) => state);

  const close = () => dispatch(closeEdit());

  const deleteSelected = () => {
    switch (page) {
      case 'tasks':
        dispatch(deleteData(tasks, selected, page));
        break;
      case 'members':
        dispatch(deleteData(members, selected, page));
        break;
      case 'user-tracks':
        dispatch(saveTrackData(userTracks, {}, track, subtask, 'delete'));
        break;
      default:
        break;
    }
    close();
  };

  return (
    <div className='modal'>
      <div className={`${theme} modal-content`}>
        <Button onClick={close} className='close'>
          <span>&times;</span>
        </Button>
        <form>
          <p htmlFor='name-field'>Are you sure?</p>
          <Button onClick={deleteSelected} className='submit warning'>
            Yes
          </Button>
          <Button onClick={close} className='submit'>
            No
          </Button>
        </form>
      </div>
    </div>
  );
}
