import './styles/Login.scss';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '../components/Buttons/Button/Button';
import { GoogleButton } from '../components/Buttons/GoogleButton/GoogleButton';
import { Spinner } from '../components/Loader/Spinner';
import { validateEmail } from '../services/validation';
import { signInFirebase, signInWithGoogle } from '../services/services';
import { eggs } from '../services/constants';
import devLogo from '../assets/images/devLogo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isLoading: false,
    };
  }

  handleClick = async () => {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    const response = await signInFirebase(email, password);
    if (response.code) {
      this.validateLogin(response.code, email);
    }
    this.setState({ isLoading: false });
  };

  validateLogin = (res, email) => {
    const { history } = this.props;
    if (validateEmail(email)) {
      this.setState({ emailError: "Email must be in valid format, for example 'username@mailbox.com'" });
    } else {
      switch (res) {
        case 'auth/invalid-email':
          this.setState({ emailError: 'The email address is badly formatted' });
          break;
        case 'auth/user-not-found':
          this.setState({ emailError: "This email doesn't exist in DIMS system" });

          break;
        case 'auth/wrong-password':
          this.setState({ passwordError: 'Invalid password' });
          break;
        default:
          history.push('/my-tasks');
          break;
      }
    }
  };

  inputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      emailError: '',
      passwordError: '',
    });
  };

  render() {
    const { emailError, passwordError, isLoading } = this.state;
    return (
      <div className='login'>
        <header className='header-login'>
          <img className='dev-logo-login' src={devLogo} alt='dev-incubator-logo' />
        </header>
        <main className={isLoading ? `drop-shadow login-form` : `login-form`}>
          <p className='welcome'>
            Welcome to <span>Dev Incubator!</span>
          </p>
          <form className='input-fields'>
            <input
              id='email-field'
              name='email'
              onChange={this.inputChange}
              autoComplete='off'
              type='email'
              placeholder='Email'
            />
            <label className='error-message' htmlFor='email-field'>
              {emailError}
            </label>
            <input
              id='password-field'
              name='password'
              onChange={this.inputChange}
              type='password'
              placeholder='Password'
            />
            <label className='error-message' htmlFor='password-field'>
              {passwordError}
            </label>
            <Button onClick={this.handleClick} className='button dev'>
              Sign In
            </Button>
            <GoogleButton onClick={signInWithGoogle}>Sign in with Google</GoogleButton>
            <Spinner visible={isLoading} />
          </form>
        </main>
        <ul className='bg-bubbles'>
          {eggs.map((el) => (
            <li key={el} />
          ))}
        </ul>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Login);
