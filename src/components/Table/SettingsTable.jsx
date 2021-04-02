import firebase from 'firebase';
import { useState } from 'react';
import { Button } from '../Buttons/Button/Button';
import { MainDataContext } from '../../contexts/MainDataContext';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export function SettingsTable() {
  const [message, setMessage] = useState('');
  const [isError, addError] = useState(false);

  const showMessage = (isSend) => {
    if (isSend) {
      setMessage('An error has occurred. Check your e-mail');
    } else {
      setMessage('Message to your e-mail was successfully sent');
    }
    addError(isSend);
  };

  const changePassword = (email) => {
    const auth = firebase.auth();
    const emailAddress = email;
    return () =>
      auth
        .sendPasswordResetEmail(emailAddress)
        .then(() => showMessage(false))
        .catch(() => showMessage(true));
  };

  return (
    <MainDataContext.Consumer>
      {({ email, role }) => (
        <tbody className='table-body'>
          <tr className='row'>
            <td>{role}</td>
            <td>{email}</td>
            <td>
              <Button onClick={changePassword(email)} className='button dev'>
                Change
              </Button>
              <p className={isError ? 'error-message' : 'success'}>{message}</p>
            </td>
            <td>
              <ThemeSwitcher />
            </td>
          </tr>
        </tbody>
      )}
    </MainDataContext.Consumer>
  );
}
