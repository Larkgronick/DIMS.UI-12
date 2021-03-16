import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './style/Popup.scss';
import { Button } from '../Buttons/Button/Button';
import { Select } from '../FormElements/Select';
import { Input } from '../FormElements/Input';
import { MEMBERS_VALIDATIONS, directions, roles, scoreScale } from '../../services/constants';
import { getCurrentDate, generateID, onBlurDate, onFocusDate, validateValues } from '../../services/helpers';
import { validateMembers, validateField } from '../../services/validation';
// import { registerNewUser } from '../../services/services'; COMMENTED TO PREVENT E-MAIL LETTER SENDINGS IN DEVELOPEMENT

export class MemberManager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
      },
      validation: {
        directionErr: false,
        nameErr: false,
        emailErr: false,
        lastNameErr: false,
        sexErr: false,
        educationErr: false,
        birthDateErr: false,
        universityAverageScoreErr: false,
        mathScoreErr: false,
        addressErr: false,
        mobilePhoneErr: false,
        skypeErr: false,
        startDateErr: false,
        roleErr: false,
        textMessage: 'This field must have at least one character',
        phoneMessage: 'Input phone number in this format: +375290000000',
        emailMessage: "Email must be in valid format, for example 'username@mailbox.com'",
        engMessage: 'This value must consist only english letters',
        dateMessage: 'Date cannot be greater than current or lesser than 01 January 1970',
      },
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
        data: {
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
        },
      });
    }
  }

  validateData = (length) => {
    const { data, validation } = this.state;
    this.setState({ validation: validateMembers(data) });
    return validateValues(validation, length);
  };

  saveMember = () => {
    const { data } = this.state;
    const { saveData } = this.props;

    if (this.validateData(MEMBERS_VALIDATIONS)) {
      saveData('members', data);
    }
  };

  addMember = () => {
    const { data } = this.state;
    // const { email } = this.state;  COMMENTED TO PREVENT E-MAIL LETTER SENDINGS IN DEVELOPEMENT
    const { tasks, updateTasks, addData } = this.props;
    const newTasks = tasks.map(({ assigners, status, trackName, note, date, name, start, deadline }) => {
      const update = {};
      update.assigners = assigners.concat(['disabled']);
      update.status = status.concat(['disabled']);
      update.trackName = trackName.concat([{ items: [] }]);
      update.note = note.concat([{ items: [] }]);
      update.date = date.concat([{ items: [] }]);
      update.name = name;
      update.start = start;
      update.deadline = deadline;

      return update;
    });

    if (this.validateData(MEMBERS_VALIDATIONS)) {
      updateTasks(newTasks);
      addData('members', data);
    }

    // registerNewUser(email, generateID());  COMMENTED TO PREVENT E-MAIL LETTER SENDINGS IN DEVELOPEMENT
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    const error = `${name}Err`;
    this.setState(({ data, validation }) => ({
      data: {
        ...data,
        [name]: value,
      },
      validation: {
        ...validation,
        [error]: validateField(name, value),
      },
    }));
  };

  render() {
    const { closeEdit, edit } = this.props;
    const { data, validation } = this.state;
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
    } = data;

    const {
      directionErr,
      nameErr,
      emailErr,
      lastNameErr,
      sexErr,
      educationErr,
      birthDateErr,
      universityAverageScoreErr,
      mathScoreErr,
      addressErr,
      mobilePhoneErr,
      skypeErr,
      startDateErr,
      roleErr,
      textMessage,
      phoneMessage,
      dateMessage,
      emailMessage,
      engMessage,
    } = validation;
    return (
      <div className='modal'>
        <div className='modal-content'>
          <Button onClick={closeEdit} className='close'>
            <span>&times;</span>
          </Button>
          <form>
            <Input
              isError={nameErr}
              errorMessage={textMessage}
              placeholder='Name'
              value={name}
              name='name'
              onChange={this.inputChange}
            >
              Name:
            </Input>
            <Input
              isError={lastNameErr}
              errorMessage={textMessage}
              placeholder='Surname'
              value={lastName}
              name='lastName'
              onChange={this.inputChange}
              required
            >
              Surname:
            </Input>
            <Select isError={sexErr} options={['male', 'female']} value={sex} name='sex' onChange={this.inputChange}>
              Sex:
            </Select>
            <Input
              isError={birthDateErr}
              errorMessage={dateMessage}
              onFocus={onFocusDate}
              onBlur={onBlurDate}
              placeholder={birthDate}
              type='date'
              value={birthDate}
              name='birthDate'
              onChange={this.inputChange}
            >
              Birth Date:
            </Input>
            <Input
              isError={educationErr}
              errorMessage={textMessage}
              placeholder='Education'
              value={education}
              name='education'
              onChange={this.inputChange}
            >
              Education:
            </Input>
            <Select
              isError={universityAverageScoreErr}
              options={scoreScale}
              value={universityAverageScore}
              name='universityAverageScore'
              onChange={this.inputChange}
            >
              University Average Score:
            </Select>
            <Select
              isError={mathScoreErr}
              options={scoreScale}
              value={mathScore}
              name='mathScore'
              onChange={this.inputChange}
            >
              Math Score:
            </Select>
            <Input
              isError={addressErr}
              errorMessage={textMessage}
              placeholder='Address'
              value={address}
              name='address'
              onChange={this.inputChange}
            >
              Address:
            </Input>
            <Input
              isError={mobilePhoneErr}
              errorMessage={phoneMessage}
              placeholder='Mobile Phone'
              type='tel'
              value={mobilePhone}
              name='mobilePhone'
              onChange={this.inputChange}
            >
              Mobile Phone:
            </Input>
            <Input
              isError={skypeErr}
              errorMessage={engMessage}
              placeholder='Skype Nickname'
              value={skype}
              name='skype'
              onChange={this.inputChange}
            >
              Skype:
            </Input>
            <Input
              isError={emailErr}
              errorMessage={emailMessage}
              placeholder='E-mail'
              type='email'
              value={email}
              name='email'
              onChange={this.inputChange}
            >
              E-mail:
            </Input>
            <Input
              isError={startDateErr}
              errorMessage={dateMessage}
              onFocus={onFocusDate}
              onBlur={onBlurDate}
              placeholder={getCurrentDate()}
              type='date'
              value={startDate}
              valueAsDate={new Date()}
              name='startDate'
              onChange={this.inputChange}
            >
              Start Date:
            </Input>
            <Select
              isError={directionErr}
              options={directions}
              value={direction}
              name='direction'
              onChange={this.inputChange}
            >
              Direction:
            </Select>
            <Select isError={roleErr} options={roles} value={role} name='role' onChange={this.inputChange}>
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
