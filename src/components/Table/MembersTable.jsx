import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { getAge, convertDate } from '../../services/helpers';
import { MainContext } from '../../services/context';

export function MembersTable() {
  return (
    <MainContext.Consumer>
      {({ members, showUserTasks, openEdit, deleteMember }) => (
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
                    <Button onClick={showUserTasks} className='button dev'>
                      Progress
                    </Button>
                  </Link>
                  <Link to='/user-tasks'>
                    <Button onClick={showUserTasks} className='button tasks'>
                      Tasks
                    </Button>
                  </Link>
                  <Button onClick={(e) => openEdit(e, true)} className='button edit'>
                    Edit
                  </Button>
                  <Button onClick={deleteMember} className='button danger'>
                    Delete
                  </Button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      )}
    </MainContext.Consumer>
  );
}
