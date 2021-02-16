import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import educationIcon from '../../assets/images/educationIcon.png';
import startIcon from '../../assets/images/startIcon.png';
import { directions, roles } from '../../services/constants';

export class NewMember extends PureComponent {
  constructor(props) {
    super(props);
    const { members, selected, edit } = this.props;
    if (edit) {
      this.state = {
        name: members[selected].name,
        direction: members[selected].direction,
        education: members[selected].education,
        educationImg: educationIcon,
        start: members[selected].strat,
        startImg: startIcon,
        age: members[selected].age,
        email: members[selected].email,
        role: members[selected].role,
      };
    } else {
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
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { modalToggle, addMember, saveMember, edit } = this.props;
    const { name, direction, education, start, age, email, role } = this.state;
    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button name={<span>&times;</span>} action={modalToggle} styles='close' />
          <form>
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
              <select id='direction' name='direction' value={direction} onChange={this.inputChange}>
                {directions.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </label>
            <label htmlFor='date'>
              Date:
              <input id='date' type='date' name='start' value={start} onChange={this.inputChange} />
            </label>
            <label htmlFor='direction'>
              Age:
              <select id='age' name='age' value={age} onChange={this.inputChange}>
                {new Array(100).fill().map((el, i) => (
                  <option>{i + 1}</option>
                ))}
              </select>
            </label>
            <label htmlFor='email'>
              E-mail:
              <input placeholder='E-mail' type='email' name='email' value={email} onChange={this.inputChange} />
            </label>
            <label htmlFor='role'>
              Role:
              <select id='role' name='role' value={role} onChange={this.inputChange}>
                {roles.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </label>
            {edit ? (
              <Button
                name='Edit'
                action={() => {
                  saveMember(this.state);
                }}
                styles='submit'
              />
            ) : (
              <Button
                name='Register'
                action={() => {
                  addMember(this.state);
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

NewMember.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  modalToggle: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  saveMember: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
