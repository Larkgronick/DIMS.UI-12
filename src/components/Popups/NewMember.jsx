import PropTypes from 'prop-types';
import { Component } from 'react';
import educationIcon from '../../assets/images/educationIcon.png';
import startIcon from '../../assets/images/startIcon.png';
import './style/Popup.css';
import { directions, roles } from '../../services/constants';

export class NewMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      direction: '',
      education: '',
      education_img: educationIcon,
      start: '',
      start_img: startIcon,
      age: '',
      email: '',
      role: '',
    };
  }

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
                placeholder='Name / Surname'
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </label>
            <label htmlFor='education-field'>
              Education:
              <input
                id='education-field'
                placeholder='Education'
                value={education}
                onChange={(e) => this.setState({ education: e.target.value })}
              />
            </label>
            <label htmlFor='direction'>
              Direction:
              <select
                name='direction'
                id='direction'
                value={direction}
                onChange={(e) => this.setState({ direction: e.target.value })}
              >
                {directions.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </label>
            <label htmlFor='date'>
              Date:
              <input id='date' type='date' value={start} onChange={(e) => this.setState({ start: e.target.value })} />
            </label>
            <label htmlFor='direction'>
              Age:
              <select
                name='direction'
                id='direction'
                value={age}
                onChange={(e) => this.setState({ age: e.target.value })}
              >
                {new Array(100).fill().map((el, i) => (
                  <option>{i + 1}</option>
                ))}
              </select>
            </label>
            <label htmlFor='email'>
              E-mail:
              <input
                type='email'
                placeholder='E-mail'
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </label>
            <label htmlFor='role'>
              Role:
              <select name='' id='role' value={role} onChange={(e) => this.setState({ role: e.target.value })}>
                {roles.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </label>
            <button
              onClick={(e) => {
                addMember(e, this.state);
              }}
              id='submit'
              type='button'
            >
              Register
            </button>
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
