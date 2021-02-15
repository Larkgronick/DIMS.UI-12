import membersIcon from '../assets/images/membersIcon.png';
import tasksIcon from '../assets/images/tasksIcon.png';
import progressIcon from '../assets/images/progressIcon.png';
import educationIcon from '../assets/images/educationIcon.png';
import startIcon from '../assets/images/startIcon.png';
import deadlineIcon from '../assets/images/deadlineIcon.png';

export const directions = ['JAVA', '.NET', 'Frontend'];
export const roles = ['Member', 'Mentor', 'Admin'];

export const drawerMenuItems = [
  { name: 'Members', path: '/members', img: membersIcon },
  { name: 'Tasks', path: '/tasks', img: tasksIcon },
  { name: 'Progress', path: '/progress', img: progressIcon },
];

export const membersMenuItems = ['Name / Direction', 'Education', 'Start', 'Age', 'Email', 'Actions'];
export const membersBody = [
  {
    name: 'Vasya',
    direction: 'JAVA',
    education: 'BSUIR',
    educationImg: educationIcon,
    start: '28.01.2021',
    startImg: startIcon,
    age: '21',
    email: 'johndoe@design.com',
    buttons: 'buttons',
    tasks: [],
  },
  {
    name: 'Petya Petrow',
    direction: '.NET',
    education: 'BSU',
    educationImg: educationIcon,
    start: '30.01.2021',
    startImg: startIcon,
    age: '22',
    email: 'johndoe2@design.com',
    buttons: 'buttons',
    tasks: [],
  },
];
export const tasksMenuItems = ['Name', 'Start', 'Deadline', 'Actions'];
export const tasksBody = [
  {
    name: 'Create the DB',
    start: '28.01.2021',
    startImg: startIcon,
    deadline: '28.01.2021',
    deadlineImg: deadlineIcon,
    buttons: 'buttons',
  },
  {
    name: 'Implement the props',
    start: '28.01.2021',
    startImg: startIcon,
    deadline: '28.01.2021',
    deadlineImg: deadlineIcon,
    buttons: 'buttons',
  },
];

export const progressMenuItems = ['Name', 'Start', 'Deadline', 'Actions'];
export const progressBody = [
  {
    name: 'Create the DB',
    note: 'Implemented the TaskState table',
    date: '28.01.2021',
    dateImg: startIcon,
    buttons: 'buttons',
  },
  {
    name: 'Create the DB',
    note: 'Created the Member view',
    date: '29.01.2021',
    dateImg: startIcon,
    buttons: 'buttons',
  },
  {
    name: 'Implement the props',
    note: 'Implemented the calc progress proc',
    date: '30.01.2021',
    dateImg: startIcon,
    buttons: 'buttons',
  },
];
