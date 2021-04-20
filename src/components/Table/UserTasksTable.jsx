import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem, openEdit } from '../../store/actions/modalAction';
import { setTaskStatus } from '../../store/actions/userDataAction';
import { Button } from '../Buttons/Button/Button';
import { getIndex, convertDate } from '../../services/helpers';

export function UserTasksTable() {
  const dispatch = useDispatch();

  const {
    user: { userTasks, userTracks },
    main: { role },
  } = useSelector((state) => state);

  const isMember = role === 'Member';

  const select = (track) => (e) => dispatch(selectItem(e, track));

  const edit = (isNew, selected) => (e) => dispatch(openEdit(e, isNew, selected));

  const set = (status, index) => (e) => dispatch(setTaskStatus(getIndex(e), status, index, userTracks));

  const renderActions = (memberRole, i) => {
    if (!memberRole) {
      return (
        <>
          <Button onClick={set('success', i)} className='button dev'>
            Success
          </Button>
          <Button onClick={set('failed', i)} className='button danger'>
            Fail
          </Button>
          <Button onClick={set('active', i)} className='button reset circle '>
            Reset
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <tbody className='table-body'>
      {userTasks.map(({ id, name, start, deadline }, i) => (
        <tr key={id} className='row'>
          <td>
            {isMember ? (
              <>
                <p className='adapt'>Task:</p>
                <Link to='/task-track'>
                  <Button onClick={select('track')} className='link'>
                    {name}
                  </Button>
                </Link>
              </>
            ) : (
              <span>{name}</span>
            )}
          </td>
          <td>
            <p className='adapt'>Start:</p>
            {convertDate(start)}
          </td>
          <td>
            <p className='adapt'>Deadline:</p>
            {convertDate(deadline)}
          </td>
          <td>
            <span className={userTracks[i].status}>{userTracks[i].status}</span>
          </td>
          {isMember ? (
            <td className='actions'>
              <Button onClick={edit(false, 'track')} className='button edit'>
                Track
              </Button>
            </td>
          ) : null}
          {!isMember ? <td className=' actions'>{renderActions(isMember, i)}</td> : null}
        </tr>
      ))}
    </tbody>
  );
}
