import membersIcon from '../assets/images/membersIcon.png';
import tasksIcon from '../assets/images/tasksIcon.png';
import progressIcon from '../assets/images/progressIcon.png';
import settingsIcon from '../assets/images/settingsIcon.png';
import myTasksIcon from '../assets/images/myTasksIcon.png';

export const MEMBERS_VALIDATIONS = 14;
export const TASK_VALIDATIONS = 4;
export const TASK_TRACK_VALIDATIONS = 3;

export const directions = ['JAVA', '.NET', 'Frontend'];
export const roles = ['Member', 'Mentor', 'Admin'];

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
  users: ['Name', 'Start', 'Deadline', 'Status', 'Actions'],
  taskTracks: ['Track Name', 'Note', 'Date'],
  settings: ['Role', 'Email', 'Password'],
  drawerAdmin: [
    { name: 'Members', path: '/members', img: membersIcon },
    { name: 'My tasks', path: '/my-tasks', img: myTasksIcon },
    { name: 'Tasks', path: '/tasks', img: tasksIcon },
    { name: 'My progress', path: '/progress', img: progressIcon },
    { name: 'Settings', path: '/settings', img: settingsIcon },
  ],
  drawerMember: [
    { name: 'My tasks', path: '/my-tasks', img: myTasksIcon },
    { name: 'My progress', path: '/progress', img: progressIcon },
    { name: 'Settings', path: '/settings', img: settingsIcon },
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

export const scoreScale = new Array(100).fill().map((el, i) => i + 1);
