import { useContext } from 'react';
import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';
import { getUserEmail } from '../../services/services';

export function SettingsTable() {
  const context = useContext(MainContext);
  const { members } = context;
  const userData = members.filter((el) => el.email === getUserEmail())[0];
  console.log(userData);
  // TO DO Password change
  const changePassword = () => {
    console.log('Change!');
  };

  return (
    <MainContext>
      {() => (
        <tbody className='table-body'>
          <tr className='row'>
            <td>{userData.role}</td>
            <td>{userData.email}</td>
            <td>
              <Button action={changePassword} styles='button dev'>
                Change
              </Button>
            </td>
          </tr>
        </tbody>
      )}
    </MainContext>
  );
}
