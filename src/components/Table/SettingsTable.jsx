import firebase from 'firebase';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../Buttons/Button/Button';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export function SettingsTable() {
  const [message, setMessage] = useState('');
  const [isError, addError] = useState(false);

  const {
    main: { email, role },
  } = useSelector((state) => state);

  const showMessage = (isSend) => {
    if (isSend) {
      setMessage('An error has occurred. Check your e-mail');
    } else {
      setMessage('Message to your e-mail was successfully sent');
    }
    addError(isSend);
  };

  const changePassword = (userEmail) => {
    const auth = firebase.auth();
    const emailAddress = userEmail;
    return () =>
      auth
        .sendPasswordResetEmail(emailAddress)
        .then(() => showMessage(false))
        .catch(() => showMessage(true));
  };

  return (
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
  );
}
