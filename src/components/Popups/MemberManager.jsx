import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { directions, roles } from '../../services/constants';
import { getCurrentDate } from '../../services/helpers';

export class MemberManager extends PureComponent {
  constructor(props) {
    super(props);
    const { members, selected, edit } = this.props;
    const {
      id,
      direction,
      name,
      email,
      lastName,
      sex,
      education,
      birthDate,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      startDate,
      role,
    } = members[selected];
    if (edit) {
      this.state = {
        id,
        direction,
        name,
        email,
        lastName,
        sex,
        education,
        birthDate,
        universityAverageScore,
        mathScore,
        address,
        mobilePhone,
        skype,
        startDate,
        role,
      };
    } else {
      this.state = {
        id: '',
        direction: '',
        name: '',
        email: '',
        lastName: '',
        sex: '',
        education: '',
        birthDate: '2000-01-01',
        universityAverageScore: 50,
        mathScore: 50,
        address: '',
        mobilePhone: '',
        skype: '',
        startDate: getCurrentDate(),
        role: '',
      };
    }
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { closeEdit, saveData, addData, edit } = this.props;
    const {
      name,
      lastName,
      direction,
      address,
      mobilePhone,
      skype,
      email,
      sex,
      education,
      universityAverageScore,
      mathScore,
      birthDate,
      startDate,
      role,
    } = this.state;

    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button name={<span>&times;</span>} action={closeEdit} styles='close' />
          <form>
            <label htmlFor='name-field'>
              Name:
              <input id='name-field' name='name' placeholder='Name' value={name} onChange={this.inputChange} />
            </label>
            <label htmlFor='lastName-field'>
              Surname:
              <input
                id='lastName-field'
                name='lastName'
                placeholder='Surname'
                value={lastName}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='sex'>
              Sex:
              <select id='sex' name='sex' value={sex} onChange={this.inputChange}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
            <label htmlFor='birth-date'>
              Birth Date:
              <input
                id='birth-date'
                type='date'
                name='birthDate'
                min='1960-01-01'
                max='2005-01-01'
                value={birthDate}
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
            <label htmlFor='university-score'>
              University Average Score:
              <select
                id='university-score'
                name='universityAverageScore'
                value={universityAverageScore}
                onChange={this.inputChange}
              >
                {new Array(100).fill().map((el, i) => (
                  <option key={el}>{i + 1}</option>
                ))}
              </select>
            </label>
            <label htmlFor='math-score'>
              Math Score:
              <select id='math-score' name='mathScore' value={mathScore} onChange={this.inputChange}>
                {new Array(100).fill().map((el, i) => (
                  <option key={el}>{i + 1}</option>
                ))}
              </select>
            </label>
            <label htmlFor='address-field'>
              Address:
              <input
                id='address-field'
                name='address'
                placeholder='Address'
                value={address}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='mobile-field'>
              Mobile Phone:
              <input
                id='mobile-field'
                type='tel'
                name='mobilePhone'
                placeholder='Mobile Phone'
                value={mobilePhone}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='skype-field'>
              Skype:
              <input
                id='skype-field'
                type='tel'
                name='mobilePhone'
                placeholder='Mobile Phone'
                value={skype}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='email'>
              E-mail:
              <input placeholder='E-mail' type='email' name='email' value={email} onChange={this.inputChange} />
            </label>
            <label htmlFor='start-date'>
              Start Date:
              <input
                id='start-date'
                type='date'
                name='start'
                valueasdate={new Date()}
                value={startDate}
                onChange={this.inputChange}
              />
            </label>
            <label htmlFor='direction'>
              Direction:
              <select id='direction' name='direction' value={direction} onChange={this.inputChange}>
                {directions.map((el) => (
                  <option key={el}>{el}</option>
                ))}
              </select>
            </label>
            <label htmlFor='role'>
              Role:
              <select id='role' name='role' value={role} onChange={this.inputChange}>
                {roles.map((el) => (
                  <option key={el}>{el}</option>
                ))}
              </select>
            </label>
            {edit ? (
              <Button
                name='Edit'
                action={() => {
                  saveData('members', this.state);
                }}
                styles='submit'
              />
            ) : (
              <Button
                name='Register'
                action={() => {
                  addData('members', this.state);
                }}
                styles='submit'
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}

MemberManager.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  addData: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
