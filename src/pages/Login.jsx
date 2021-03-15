import { Component } from 'react';
import './styles/Login.scss';
import devLogo from '../assets/images/devLogo.png';
import { Button } from '../components/Buttons/Button/Button';
import { signInFirebase } from '../services/services';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
    this.inputChange = this.inputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // TO DO: deal with validation
  async handleClick() {
    const { email, password } = this.state;
    const response = await signInFirebase(email, password);
    if (response.code) {
      this.validateLogin(response.code);
    }
  }

  validateLogin = (res) => {
    switch (res) {
      case 'auth/invalid-email':
        this.setState({ emailError: 'The email address is badly formatted' });
        break;
      case 'auth/user-not-found':
        this.setState({ emailError: "This email doesn't exist in DIMS system" });
        break;
      case 'auth/wrong-password':
        console.log(res);
        this.setState({ passwordError: 'Invalid password' });
        break;
      default:
        break;
    }
  };

  inputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      emailError: '',
      passwordError: '',
    });
  }

  render() {
    const { emailError, passwordError } = this.state;

    return (
      <div className='login'>
        <header className='header-login'>
          <img className='dev-logo-login' src={devLogo} alt='dev-incubator-logo' />
        </header>
        <main className='login-form'>
          <p className='welcome'>
            Welcome to <span>Dev Incubator!</span>
          </p>
          <form className='input-fields'>
            <input id='email-field' name='email' onChange={this.inputChange} type='email' placeholder='Login' />
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
          </form>
        </main>
      </div>
    );
  }
}
