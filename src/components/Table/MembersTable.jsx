import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openEdit } from '../../store/actions/modalAction';
import { showUserTasks } from '../../store/actions/userDataAction';
import { deleteData } from '../../store/actions/mainDataAction';
import { Button } from '../Buttons/Button/Button';
import { convertDate } from '../../services/helpers';

export function MembersTable() {
  const dispatch = useDispatch();
  const {
    main: { role, members },
  } = useSelector((state) => state);

  const isAdmin = role === 'Admin';

  const edit = (isNew, selected) => {
    return (e) => dispatch(openEdit(e, isNew, selected));
  };

  const show = (e) => {
    return dispatch(showUserTasks(e));
  };

  const deleteMember = (page) => {
    return (e) => dispatch(deleteData(members, e, page));
  };

  return (
    <tbody className='table-body'>
      {members.map(({ id, name, lastName, direction, email, education, mobilePhone, startDate }) => (
        <tr key={id} className='row'>
          <td>
            <span>{`${name} ${lastName}`}</span>
            <span className='attention'>{` ${direction}`}</span>
          </td>
          <td>{email}</td>
          <td>{education}</td>
          <td>{mobilePhone}</td>
          <td>{convertDate(startDate)}</td>
          <td className='actions'>
            <Link to='/progress'>
              <Button onClick={show} className='button dev'>
                Progress
              </Button>
            </Link>
            <Link to='/user-tasks'>
              <Button onClick={show} className='button tasks'>
                Tasks
              </Button>
            </Link>
            {isAdmin ? (
              <span>
                <Button onClick={edit(true, 'selected')} className='button edit'>
                  Edit
                </Button>
                <Button onClick={deleteMember('members')} className='button danger'>
                  Delete
                </Button>
              </span>
            ) : null}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
