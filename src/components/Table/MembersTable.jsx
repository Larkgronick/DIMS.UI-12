import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Button/Button';
import { getAge, convertDate } from '../../services/helpers';
import { MainContext } from '../../services/context';

export function MembersTable() {
  return (
    <MainContext>
      {({ members, editData, deleteData, showUserTasks, selectItem }) => (
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
                    <Button
                      action={(e) => {
                        showUserTasks(e);
                        selectItem(e, 'selected');
                      }}
                      styles='button dev'
                    >
                      Progress
                    </Button>
                  </Link>
                  <Link to='/user-tasks'>
                    <Button
                      action={(e) => {
                        showUserTasks(e);
                      }}
                      styles='button tasks'
                    >
                      Tasks
                    </Button>
                  </Link>
                  <Button
                    action={(e) => {
                      editData(e);
                    }}
                    styles='button edit'
                  >
                    Edit
                  </Button>
                  <Button action={(e) => deleteData(e, 'members')} styles='button danger'>
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
