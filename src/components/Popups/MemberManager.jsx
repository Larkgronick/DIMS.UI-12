import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Select } from '../FormElements/Select';
import { Input } from '../FormElements/Input';
import { directions, roles, scoreScale } from '../../services/constants';
import { getCurrentDate, generateID } from '../../services/helpers';
// import { registerNewUser } from '../../services/services';

export class MemberManager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: generateID(),
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

  componentDidMount() {
    const { edit, members, selected } = this.props;
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
      this.setState({
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
      });
    }
  }

  saveMember = () => {
    const { saveData } = this.props;
    saveData('members', this.state);
  };

  addMember = () => {
    // const { email } = this.state;
    const { addData, tasks, updateTasks } = this.props;
    const newTasks = [...tasks];
    newTasks.forEach(({ assigners, trackName, note, date }) => {
      assigners.push('disabled');
      trackName.push({ items: [] });
      note.push({ items: [] });
      date.push({ items: [] });
    });
    console.log(newTasks);
    updateTasks(newTasks);
    // registerNewUser(email, generateID());
    addData('members', this.state);
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { closeEdit, edit } = this.props;
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
          <Button onClick={closeEdit} className='close'>
            <span>&times;</span>
          </Button>
          <form>
            <Input placeholder='Name' value={name} name='name' onChange={this.inputChange}>
              Name:
            </Input>
            <Input placeholder='Surname' value={lastName} name='lastName' onChange={this.inputChange}>
              Surname:
            </Input>
            <Select options={['Male', 'Female']} value={sex} name='sex' onChange={this.inputChange}>
              Sex:
            </Select>
            <Input
              type='date'
              min='1960-01-01'
              max='2005-01-01'
              value={birthDate}
              name='birthDate'
              onChange={this.inputChange}
            >
              Birth Date:
            </Input>
            <Input placeholder='Education' value={education} name='education' onChange={this.inputChange}>
              Education:
            </Input>
            <Select
              options={scoreScale}
              value={universityAverageScore}
              name='universityAverageScore'
              onChange={this.inputChange}
            >
              University Average Score:
            </Select>
            <Select options={scoreScale} value={mathScore} name='mathScore' onChange={this.inputChange}>
              Math Score:
            </Select>
            <Input placeholder='Address' value={address} name='address' onChange={this.inputChange}>
              Address:
            </Input>
            <Input
              placeholder='Mobile Phone'
              type='tel'
              value={mobilePhone}
              name='mobilePhone'
              onChange={this.inputChange}
            >
              Mobile Phone:
            </Input>
            <Input placeholder='Skype Nickname' value={skype} name='skype' onChange={this.inputChange}>
              Skype:
            </Input>
            <Input placeholder='E-mail' type='email' value={email} name='email' onChange={this.inputChange}>
              E-mail:
            </Input>
            <Input type='date' value={startDate} valueAsDate={new Date()} name='startDate' onChange={this.inputChange}>
              Start Date:
            </Input>
            <Select options={directions} value={direction} name='direction' onChange={this.inputChange}>
              Direction:
            </Select>
            <Select options={roles} value={role} name='role' onChange={this.inputChange}>
              Role:
            </Select>
            {edit ? (
              <Button onClick={this.saveMember} className='submit'>
                Edit
              </Button>
            ) : (
              <Button onClick={this.addMember} className='submit'>
                Register
              </Button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

MemberManager.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  tasks: PropTypes.instanceOf(Array).isRequired,
  updateTasks: PropTypes.func.isRequired,
  addData: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
