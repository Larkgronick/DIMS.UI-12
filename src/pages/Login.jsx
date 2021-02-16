import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Login.scss';
import devLogo from '../assets/images/devLogo.png';
import { Button } from '../components/Buttons/Button/Button';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationTab: false,
    };
  }

  selectRegistration = (e) => {
    const { setEmail, setPassword, clearErrors } = this.props;
    setEmail('');
    setPassword('');
    clearErrors();
    e.target.parentNode.children[1].classList.add('selected');
    e.target.parentNode.children[0].classList.remove('selected');
    this.setState({
      registrationTab: true,
    });
  };

  selectLogin = (e) => {
    const { setEmail, setPassword, clearErrors } = this.props;
    setEmail('');
    setPassword('');
    clearErrors();
    e.target.parentNode.children[0].classList.add('selected');
    e.target.parentNode.children[1].classList.remove('selected');
    this.setState({
      registrationTab: false,
    });
  };

  render() {
    const { registrationTab } = this.state;
    const { email, password, setEmail, setPassword, emailError, passwordError, signIn, signUp } = this.props;
    const loginMessage = (
      <h2>
        Welcome<span>back!</span>
      </h2>
    );
    const registrationMessage = <h2>Add admin</h2>;
    const loginButton = <Button name='Sign In' action={signIn} styles='button dev' />;
    const registrationButton = <Button name='Sign Up' action={signUp} styles='button dev' />;

    return (
      <div className='login'>
        <header className='header-login'>
          <img className='dev-logo-login' src={devLogo} alt='dev-incubator-logo' />
          <div>
            <Button name='Login' action={this.selectLogin} styles='header-button selected' />
            <Button name='Register' action={this.selectRegistration} styles='header-button' />
          </div>
        </header>
        <main className='login-form'>
          {registrationTab ? registrationMessage : loginMessage}
          <form className='input-fields'>
            <input
              id='email-field'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              placeholder='Login'
            />
            <input
              id='password-field'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              name='password'
              placeholder='Password'
            />
            <label className='error-message' htmlFor='email-field'>
              {emailError}
            </label>
            <label className='error-message' htmlFor='password-field'>
              {passwordError}
            </label>
            {registrationTab ? registrationButton : loginButton}
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};
