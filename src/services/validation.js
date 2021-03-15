export function validateMembers(data) {
  const {
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
  } = data;
  const results = {};
  results.directionErr = validateField('direction', direction);
  results.nameErr = validateField('name', name);
  results.emailErr = validateField('email', email);
  results.lastNameErr = validateField('lastName', lastName);
  results.sexErr = validateField('sex', sex);
  results.educationErr = validateField('education', education);
  results.birthDateErr = validateField('birthDate', birthDate);
  results.universityAverageScoreErr = validateField('universityAverageScore', universityAverageScore);
  results.mathScoreErr = validateField('mathScore', mathScore);
  results.addressErr = validateField('address', address);
  results.mobilePhoneErr = validateField('mobilePhone', mobilePhone);
  results.skypeErr = validateField('skype', skype);
  results.startDateErr = validateField('startDate', startDate);
  results.roleErr = validateField('role', role);

  results.textMessage = 'This field must have at least one character';
  results.phoneMessage = 'Input phone number in this format: +375330000000';
  results.emailMessage = "Email must be in valid format, for example 'username@mailbox.com'";
  results.engMessage = 'This value must consist only english letters';
  results.dateMessage = 'Date cannot be greater than current or lesser than 01 January 1970';

  return results;
}

export function validateTasks(data) {
  const { name, description, start, deadline } = data;
  const results = {};
  results.nameErr = validateField('name', name);
  results.descriptionErr = validateField('description', description);
  results.startErr = validateField('start', start);
  results.deadlineErr = validateField('deadline', deadline);

  results.textMessage = 'This field must have at least one character';
  results.dateMessage = 'Date cannot be greater than current or lesser than 01 January 1970';
  results.deadlineMessage = 'Date cannot be lower than current';

  return results;
}

export function validateTasksTracks(data) {
  const { trackName, date, note } = data;
  const results = {};
  results.trackNameErr = validateField('trackName', trackName);
  results.dateErr = validateField('date', date);
  results.noteErr = validateField('note', note);

  results.textMessage = 'This field must have at least one character';
  results.dateMessage = 'Date cannot be greater than current or lesser than 01 January 1970';

  return results;
}

export function validateField(name, value) {
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
    case 'start':
    case 'date':
      return validateDate(value);
    case 'mobilePhone':
      return validateNumber(value);
    case 'email':
      return validateEmail(value);
    case 'skype':
      return validateEng(value);
    case 'deadline':
      return validateDeadline(value);
    default:
      return null;
  }
}

function validateSelect(value) {
  return value === '';
}

function validateText(value) {
  return value.length === 0;
}

function validateNumber(value) {
  const belarusNumber = /^\+375(\s+)?\(?(17|29|33|44)\)?(\s+)?[0-9]{3}[0-9]{2}[0-9]{2}$/;
  return !belarusNumber.test(value);
}

function validateEmail(value) {
  const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email.test(String(value).toLowerCase());
}

function validateEng(value) {
  const input = /^[A-Za-z][A-Za-z0-9]*$/;
  return !input.test(value);
}

function validateDate(value) {
  const inputedData = new Date(value).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);
  if (inputedData > now || inputedData < 0) {
    return true;
  }
  return false;
}

function validateDeadline(value) {
  const inputedData = new Date(value).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);
  return inputedData < now;
}
