import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Button } from '../Buttons/Button/Button';
import educationIcon from '../../assets/images/educationIcon.png';
import startIcon from '../../assets/images/startIcon.png';
import { directions, roles } from '../../services/constants';
import './style/Popup.scss';

export class NewMember extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      direction: '',
      education: '',
      educationImg: educationIcon,
      start: '',
      startImg: startIcon,
      age: '',
      email: '',
      role: '',
    };
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { modalToggle, addMember } = this.props;
    const { name, direction, education, start, age, email, role } = this.state;

    return (
      <div className='modal'>
        <div className='modal-content'>
          <button className='close' onClick={modalToggle} type='button'>
            &times;
          </button>
          <form action=''>
            <label htmlFor='name-field'>
              Name:
              <input
                id='name-field'
                name='name'
                placeholder='Name / Surname'
                value={name}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='education-field'>
              Education:
              <input
                id='education-field'
                name='education'
                placeholder='Education'
                value={education}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='direction'>
              Direction:
              <select name='direction' id='direction' value={direction} onChange={this.inputChange}>
                {directions.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </label>
            <label htmlFor='date'>
              Date:
              <input id='date' type='date' name='start' value={start} onChange={this.inputChange} />
            </label>
            <label htmlFor='age'>
              Age:
              <select id='age' name='age' value={age} onChange={this.inputChange}>
                {new Array(100).fill().map((el, i) => (
                  <option>{i + 1}</option>
                ))}
              </select>
            </label>
            <label htmlFor='email'>
              E-mail:
              <input type='email' placeholder='E-mail' name='email' value={email} onChange={this.inputChange} />
            </label>
            <label htmlFor='role'>
              Role:
              <select name='role' id='role' value={role} onChange={this.inputChange}>
                {roles.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </label>
            <Button
              name='Register'
              action={(e) => {
                addMember(e, this.state);
              }}
              styles='submit'
            />
          </form>
        </div>
      </div>
    );
  }
}

NewMember.propTypes = {
  modalToggle: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
};
