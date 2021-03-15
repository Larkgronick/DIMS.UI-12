import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { getAge, convertDate } from '../../services/helpers';
import { MainContext } from '../../services/context';

export function MembersTable() {
  function validateRoleView(context) {
    switch (context.userData.role) {
      case 'Admin':
        return (
          <td>
            <Link to='/progress'>
              <Button onClick={context.showUserTasks} className='button dev'>
                Progress
              </Button>
            </Link>
            <Link to='/user-tasks'>
              <Button onClick={context.showUserTasks} className='button tasks'>
                Tasks
              </Button>
            </Link>
            <Button onClick={(e) => context.openEdit(e, true)} className='button edit'>
              Edit
            </Button>
            <Button onClick={context.deleteMember} className='button danger'>
              Delete
            </Button>
          </td>
        );
      case 'Member':
        return null;

      default:
        return null;
    }
  }

  return (
    <MainContext.Consumer>
      {(context) => (
        <tbody className='table-body'>
          {context.members.map(
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
                {validateRoleView(context)}
              </tr>
            ),
          )}
        </tbody>
      )}
    </MainContext.Consumer>
  );
}
