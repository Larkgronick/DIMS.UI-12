import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Select } from '../FormElements/Select';
import { Input } from '../FormElements/Input';
import { directions, roles, scoreScale } from '../../services/constants';
import { getCurrentDate } from '../../services/helpers';

export class MemberManager extends PureComponent {
  constructor(props) {
    super(props);
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
    const { addData } = this.props;
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
          <Button action={closeEdit} styles='close'>
            <span>&times;</span>
          </Button>
          <form>
            <Input placeholder='Name' value={name} name='name' action={this.inputChange}>
              Name:
            </Input>
            <Input placeholder='Surname' value={lastName} name='lastName' action={this.inputChange}>
              Surname:
            </Input>
            <Select options={['Male', 'Female']} value={sex} name='sex' action={this.inputChange}>
              Sex:
            </Select>
            <Input
              type='date'
              min='1960-01-01'
              max='2005-01-01'
              value={birthDate}
              name='birthDate'
              action={this.inputChange}
            >
              Birth Date:
            </Input>
            <Input placeholder='Education' value={education} name='education' action={this.inputChange}>
              Education:
            </Input>
            <Select
              options={scoreScale}
              value={universityAverageScore}
              name='universityAverageScore'
              action={this.inputChange}
            >
              University Average Score:
            </Select>
            <Select options={scoreScale} value={mathScore} name='mathScore' action={this.inputChange}>
              Math Score:
            </Select>
            <Input placeholder='Address' value={address} name='address' action={this.inputChange}>
              Address:
            </Input>
            <Input
              placeholder='Mobile Phone'
              type='tel'
              value={mobilePhone}
              name='mobilePhone'
              action={this.inputChange}
            >
              Mobile Phone:
            </Input>
            <Input placeholder='Skype Nickname' value={skype} name='skype' action={this.inputChange}>
              Skype:
            </Input>
            <Input placeholder='E-mail' type='email' value={email} name='email' action={this.inputChange}>
              E-mail:
            </Input>
            <Input type='date' value={startDate} valueasdate={new Date()} name='startDate' action={this.inputChange}>
              Start Date:
            </Input>
            <Select options={directions} value={direction} name='direction' action={this.inputChange}>
              Direction:
            </Select>
            <Select options={roles} value={role} name='role' action={this.inputChange}>
              Role:
            </Select>
            {edit ? (
              <Button action={this.saveMember} styles='submit'>
                Edit
              </Button>
            ) : (
              <Button action={this.addMember} styles='submit'>
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
  addData: PropTypes.func.isRequired,
  closeEdit: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
};
