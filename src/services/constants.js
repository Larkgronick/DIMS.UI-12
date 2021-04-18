import membersIcon from '../assets/images/membersIcon.png';
import tasksIcon from '../assets/images/tasksIcon.png';
import progressIcon from '../assets/images/progressIcon.png';
import settingsIcon from '../assets/images/settingsIcon.png';
import myTasksIcon from '../assets/images/myTasksIcon.png';
import aboutIcon from '../assets/images/aboutIcon.png';
import burgerIcon from '../assets/images/burgerIcon.png';
import birdIcon from '../assets/images/birdIcon.png';
import larkgronickIcon from '../assets/images/larkgronickIcon.png';
import incubatorIcon from '../assets/images/incubatorIcon.png';
import userIcon from '../assets/images/userIcon.png';
import { getCurrentDate } from './helpers';

export const MEMBERS_VALIDATIONS = 14;
export const TASK_VALIDATIONS = 4;
export const TASK_TRACK_VALIDATIONS = 3;

export const directions = ['JAVA', '.NET', 'Frontend'];
export const roles = ['Member', 'Mentor', 'Admin'];

export const memberInit = {
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

export const memberInitVal = {
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
};

export const taskInit = {
  id: '',
  name: '',
  description: '',
  start: getCurrentDate(),
  deadline: getCurrentDate(),
  assigners: [],
};

export const taskInitVal = {
  nameErr: false,
  descriptionErr: false,
  startErr: false,
  deadlineErr: false,
  textMessage: 'This field must have at least one character',
  deadlineMessage: 'Date cannot be lower than current',
};

export const taskTrackInit = {
  name: '',
  trackName: '',
  date: getCurrentDate(),
  note: '',
};

export const taskTrackInitVal = {
  trackNameErr: false,
  dateErr: false,
  noteErr: false,
  textMessage: 'This field must have at least one character',
  dateMessage: 'Date cannot be greater than current or lesser than 01 January 1970',
};

export const images = {
  burgerIcon,
  birdIcon,
  larkgronickIcon,
  incubatorIcon,
  userIcon,
  googleIcon: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
};

const commonButtons = [
  { name: 'My tasks', load: true, className: 'button tasks', path: '/my-tasks', img: myTasksIcon },
  { name: 'My progress', load: true, className: 'button edit', path: '/progress', img: progressIcon },
  { name: 'Settings', load: false, className: 'button danger', path: '/settings', img: settingsIcon },
];

const allButtons = [
  { name: 'Members', load: false, className: 'button dev', path: '/members', img: membersIcon },
  { name: 'Tasks', load: false, className: 'button tasks', path: '/tasks', img: tasksIcon },
  ...commonButtons,
];

const aboutButton = [{ name: 'About', className: '', path: '/about', img: aboutIcon }];

export const buttons = {
  Admin: allButtons,
  Mentor: allButtons,
  Member: commonButtons,
};

export const menuItems = {
  members: ['Name / Direction', 'Email', 'Education', 'Mobile phone', 'Start date', 'Actions'],
  tasks: ['Name', 'Start', 'Deadline', 'Actions'],
  progress: ['Task Name', 'Track', 'Note', 'Date', 'Status'],
  users: ['Name', 'Start', 'Deadline', 'Status'],
  taskTracks: ['Track Name', 'Note', 'Date', 'Actions'],
  settings: ['Role', 'Email', 'Password', 'Theme'],
  howto: ["What's next?"],
  about: ['DIMS-UI-12'],
  drawerAdmin: [...buttons.Admin, ...aboutButton],
  drawerMentor: [...buttons.Mentor, ...aboutButton],
  drawerMember: [...buttons.Member, ...aboutButton],
};

export const validation = {
  members: [
    'direction',
    'name',
    'email',
    'lastName',
    'sex',
    'education',
    'birthDate',
    'universityAverageScore',
    'mathScore',
    'address',
    'mobilePhone',
    'skype',
    'startDate',
    'role',
  ],
  tasks: ['name', 'description', 'start', 'deadline'],
  taskTracks: ['trackName', 'date', 'note'],
};

export const messages = {
  type: ['textMessage', 'dateMessage', 'phoneMessage', 'deadlineMessage', 'emailMessage', 'engMessage'],
  caption: [
    'This field must have at least one character',
    'Date cannot be greater than current or lesser than 01 January 1970',
    'Input phone number in this format: +375330000000',
    'Date cannot be lower than current',
    "Email must be in valid format, for example 'username@mailbox.com'",
    'This value must consist only english letters',
  ],
};

export const scoreScale = new Array(100).fill().map((el, i) => (i + 1).toString());

export const eggs = new Array(10).fill().map((el, i) => i.toString());
