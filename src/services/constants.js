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

export const MEMBERS_VALIDATIONS = 14;
export const TASK_VALIDATIONS = 4;
export const TASK_TRACK_VALIDATIONS = 3;

export const directions = ['JAVA', '.NET', 'Frontend'];
export const roles = ['Member', 'Mentor', 'Admin'];

export const images = {
  burgerIcon,
  birdIcon,
  larkgronickIcon,
  incubatorIcon,
  userIcon,
  googleIcon: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
};

export const menuItems = {
  members: [
    'Name / Direction',
    'Email',
    'Sex',
    'Education',
    'Age',
    'University average scope',
    'Math scope',
    'Address',
    'Mobile phone',
    'Skype',
    'Start date',
    'Actions',
  ],
  tasks: ['Name', 'Start', 'Deadline', 'Actions'],
  progress: ['Task Name', 'Track', 'Note', 'Date'],
  users: ['Name', 'Start', 'Deadline', 'Status'],
  taskTracks: ['Track Name', 'Note', 'Date'],
  settings: ['Role', 'Email', 'Password', 'Theme'],
  howto: ["What's next?"],
  about: ['DIMS-UI-12'],
  drawerAdmin: [
    { name: 'Members', className: 'button dev', path: '/members', img: membersIcon },
    { name: 'My tasks', className: 'button edit', path: '/my-tasks', img: myTasksIcon },
    { name: 'Tasks', className: 'button tasks', path: '/tasks', img: tasksIcon },
    { name: 'My progress', className: 'button edit', path: '/progress', img: progressIcon },
    { name: 'Settings', className: 'button danger', path: '/settings', img: settingsIcon },
    { name: 'About', className: '', path: '/about', img: aboutIcon },
  ],

  drawerMember: [
    { name: 'My tasks', className: 'button tasks', path: '/my-tasks', img: myTasksIcon },
    { name: 'My progress', className: 'button edit', path: '/progress', img: progressIcon },
    { name: 'Settings', className: 'button danger', path: '/settings', img: settingsIcon },
    { name: 'About', className: '', path: '/', img: aboutIcon },
  ],
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
