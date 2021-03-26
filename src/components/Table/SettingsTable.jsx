import { Button } from '../Buttons/Button/Button';
import { UserTasksContext } from '../../contexts/UserTasksContext';

export function SettingsTable() {
  // TO DO Password change
  const changePassword = () => {
    console.log('Change!');
  };

  return (
    <UserTasksContext.Consumer>
      {({ userData }) => (
        <tbody className='table-body'>
          <tr className='row'>
            <td>{userData.role}</td>
            <td>{userData.email}</td>
            <td>
              <Button onClick={changePassword} className='button dev'>
                Change
              </Button>
            </td>
          </tr>
        </tbody>
      )}
    </UserTasksContext.Consumer>
  );
}
