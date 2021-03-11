import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function SettingsTable() {
  // TO DO Password change
  const changePassword = () => {
    console.log('Change!');
  };

  return (
    <MainContext.Consumer>
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
    </MainContext.Consumer>
  );
}
