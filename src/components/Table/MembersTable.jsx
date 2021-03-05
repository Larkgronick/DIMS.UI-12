import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { getAge, convertDate } from '../../services/helpers';
import { MainContext } from '../../services/context';

export function MembersTable() {
  const context = useContext(MainContext);

  const showMemberData = (e) => {
    const caption = e.target.textContent;
    context.showUserTasks(e);
    if (caption === 'Progress') {
      context.selectItem(e, 'selected');
    }
  };

  const editMember = (e) => {
    context.editData(e);
  };

  const deleteMember = (e) => {
    context.deleteData(e, 'members');
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
