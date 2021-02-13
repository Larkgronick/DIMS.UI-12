import './styles/Login.scss';
import { Link } from 'react-router-dom';
import { Button } from '../components/Buttons/Button/Button';
import devLogo from '../assets/images/devLogo.png';

export function Login() {
  return (
    <div className='login'>
      <header className='header-login'>
        <img className='dev-logo-login' src={devLogo} alt='dev-incubator-logo' />
        <div>
          <Button name='Register' styles='header-button' />
          <Button name='Login' styles='header-button' />
        </div>
      </header>
      <main className='login-form'>
        <h2>
          Welcome<span>back!</span>
        </h2>
        <form className='input-fields'>
          <input className='login-field' type='email' name='email' placeholder='Login' />
          <input className='password-field' type='password' name='password' placeholder='Password' />
          <Link to='/members'>
            <Button name='Enter' styles='button' />
          </Link>
        </form>
      </main>
    </div>
  );
}
