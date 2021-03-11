import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { getAge, getIndex, convertDate } from '../../services/helpers';
import { MainContext } from '../../services/context';

export function MembersTable() {
  const context = useContext(MainContext);

  const showMemberData = (e) => {
    context.showUserTasks(e);
    context.selectItem(e, 'selected');
  };

  const editMember = (e) => {
    context.editData(e);
  };

  const deleteMember = (e) => {
    const { tasks, updateTasks, deleteData } = context;
    const newTasks = [...tasks];
    newTasks.forEach(({ assigners, trackName, note, date }) => {
      assigners.splice(getIndex(e), 1);
      trackName.splice(getIndex(e), 1);
      note.splice(getIndex(e), 1);
      date.splice(getIndex(e), 1);
    });
    updateTasks(newTasks);
    deleteData(e, 'members');
  };

  return (
    <MainContext>
      {({ members }) => (
        <tbody className='table-body'>
          {members.map(
            ({
              id,
              name,
              lastName,
              direction,
              birthDate,
              email,
              sex,
              education,
              universityAverageScore,
              mathScore,
              address,
              mobilePhone,
              startDate,
              skype,
            }) => (
              <tr key={id} className='row'>
                <td className='name'>
                  <span>{`${name} ${lastName}`}</span>
                  <span className='attention'>{direction}</span>
                </td>
                <td>{email}</td>
                <td>{sex}</td>
                <td>{education}</td>
                <td>{getAge(birthDate)}</td>
                <td>{universityAverageScore}</td>
                <td>{mathScore}</td>
                <td>{address}</td>
                <td>{mobilePhone}</td>
                <td>{skype}</td>
                <td>{convertDate(startDate)}</td>
                <td>
                  <Link to='/progress'>
                    <Button action={(e) => showMemberData(e)} styles='button dev'>
                      Progress
                    </Button>
                  </Link>
                  <Link to='/user-tasks'>
                    <Button action={(e) => showMemberData(e)} styles='button tasks'>
                      Tasks
                    </Button>
                  </Link>
                  <Button action={(e) => editMember(e)} styles='button edit'>
                    Edit
                  </Button>
                  <Button action={(e) => deleteMember(e)} styles='button danger'>
                    Delete
                  </Button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      )}
    </MainContext>
  );
}
