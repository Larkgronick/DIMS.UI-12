import './style/Popup.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeEdit } from '../../store/actions/modalAction';
import { saveData } from '../../store/actions/mainDataAction';
import { Button } from '../Buttons/Button/Button';
import { Select } from '../FormElements/Select';
import { Input } from '../FormElements/Input';
import {
  MEMBERS_VALIDATIONS,
  directions,
  roles,
  scoreScale,
  memberInit,
  memberInitVal,
} from '../../services/constants';
import {
  getCurrentDate,
  onBlurDate,
  onFocusDate,
  validateValues,
  convertDate,
  generateID,
} from '../../services/helpers';
import { validateCategory, validateField } from '../../services/validation';
import { registerNewUser } from '../../services/services';

export function MemberManager() {
  const dispatch = useDispatch();
  const [data, setData] = useState(memberInit);
  const [validation, setValidation] = useState(memberInitVal);

  const {
    main: { members, theme },
    modal: { edit, selected },
  } = useSelector((state) => state);

  useEffect(() => {
    if (edit) {
      setData(members[selected]);
    }
  }, []);

  const close = () => dispatch(closeEdit());

  const save = (newData, isNew) => dispatch(saveData(members, 'members', newData, selected, isNew));

  const validateData = (length) => {
    const validateResult = validateCategory('members', data);
    setValidation(validateResult);
    return validateValues(validateResult, length);
  };

  const saveMember = () => {
    if (validateData(MEMBERS_VALIDATIONS)) {
      save(data, false);
      close();
    }
  };

  const addMember = () => {
    if (validateData(MEMBERS_VALIDATIONS)) {
      const { email } = data;
      save(data, true);
      close();
      registerNewUser(email, generateID());
    }
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    const error = `${name}Err`;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    setValidation((prevState) => {
      return {
        ...prevState,
        [error]: validateField(name, value),
      };
    });
  };

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
      <div className={`${theme} members modal-content`}>
        <Button onClick={close} className='close'>
          <span>&times;</span>
        </Button>
        <form>
          <div className='new-member'>
            <div className='column'>
              <Input
                isError={nameErr}
                errorMessage={textMessage}
                placeholder='Name'
                value={name}
                name='name'
                onChange={inputChange}
              >
                Name:
              </Input>
              <Input
                isError={lastNameErr}
                errorMessage={textMessage}
                placeholder='Surname'
                value={lastName}
                name='lastName'
                onChange={inputChange}
                required
              >
                Surname:
              </Input>
              <Select isError={sexErr} options={['male', 'female']} value={sex} name='sex' onChange={inputChange}>
                Sex:
              </Select>
              <Input
                isError={birthDateErr}
                errorMessage={dateMessage}
                onFocus={onFocusDate}
                onBlur={onBlurDate}
                placeholder={convertDate(birthDate)}
                type='date'
                max='2999-12-31'
                value={birthDate}
                name='birthDate'
                onChange={inputChange}
              >
                Birth Date:
              </Input>
              <Input
                isError={educationErr}
                errorMessage={textMessage}
                placeholder='Education'
                value={education}
                name='education'
                onChange={inputChange}
              >
                Education:
              </Input>
              <Select
                isError={universityAverageScoreErr}
                options={scoreScale}
                value={universityAverageScore}
                name='universityAverageScore'
                onChange={inputChange}
              >
                University Average Score:
              </Select>
              <Select
                isError={mathScoreErr}
                options={scoreScale}
                value={mathScore}
                name='mathScore'
                onChange={inputChange}
              >
                Math Score:
              </Select>
            </div>
            <div className='column'>
              <Input
                isError={addressErr}
                errorMessage={textMessage}
                placeholder='Address'
                value={address}
                name='address'
                onChange={inputChange}
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
                onChange={inputChange}
              >
                Mobile Phone:
              </Input>
              <Input
                isError={skypeErr}
                errorMessage={engMessage}
                placeholder='Skype Nickname'
                value={skype}
                name='skype'
                onChange={inputChange}
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
                onChange={inputChange}
              >
                E-mail:
              </Input>
              <Input
                isError={startDateErr}
                errorMessage={dateMessage}
                onFocus={onFocusDate}
                onBlur={onBlurDate}
                placeholder={convertDate(getCurrentDate())}
                type='date'
                max='2999-12-31'
                value={startDate}
                valueAsDate={new Date()}
                name='startDate'
                onChange={inputChange}
              >
                Start Date:
              </Input>
              <Select
                isError={directionErr}
                options={directions}
                value={direction}
                name='direction'
                onChange={inputChange}
              >
                Direction:
              </Select>
              <Select isError={roleErr} options={roles} value={role} name='role' onChange={inputChange}>
                Role:
              </Select>
            </div>
          </div>
          {edit ? (
            <Button onClick={saveMember} className='submit'>
              Edit
            </Button>
          ) : (
            <Button onClick={addMember} className='submit'>
              Register
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
