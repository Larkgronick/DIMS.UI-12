import { validation, messages } from './constants';

export const validateCategory = (category, data) => {
  const results = {};

  validation[category].map((el) => {
    results[`${el}Err`] = validateField(el, data[el]);
    return null;
  });

  messages.type.map((el, i) => {
    results[el] = messages.caption[i];
    return null;
  });

  return results;
};

export const validateField = (name, value) => {
  switch (name) {
    case 'direction':
    case 'sex':
    case 'universityAverageScore':
    case 'mathScore':
    case 'role':
      return validateSelect(value);
    case 'name':
    case 'lastName':
    case 'education':
    case 'address':
    case 'description':
    case 'trackName':
    case 'note':
      return validateText(value);
    case 'birthDate':
    case 'startDate':
    case 'date':
      return validateDate(value);
    case 'mobilePhone':
      return validateNumber(value);
    case 'email':
      return validateEmail(value);
    case 'skype':
      return validateEng(value);
    case 'start':
    case 'deadline':
      return validateDeadline(value);
    default:
      return null;
  }
};

const validateSelect = (value) => {
  return value === '';
};

const validateText = (value) => {
  return !value.length;
};

const validateNumber = (value) => {
  const belarusNumber = /^\+375(\s+)?\(?(17|29|33|44)\)?(\s+)?[0-9]{3}[0-9]{2}[0-9]{2}$/;
  return !belarusNumber.test(value);
};

export const validateEmail = (value) => {
  const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email.test(String(value).toLowerCase());
};

const validateEng = (value) => {
  const input = /^[A-Za-z][A-Za-z0-9]*$/;
  return !input.test(value);
};

const validateDate = (value) => {
  return getInputDate(value) > getNow() || getInputDate(value) < 0;
};

const validateDeadline = (value) => {
  return getInputDate(value) < getNow();
};

const getInputDate = (value) => {
  return new Date(value).setHours(0, 0, 0, 0);
};

const getNow = () => {
  return new Date().setHours(0, 0, 0, 0);
};
