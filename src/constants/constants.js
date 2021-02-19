import educationIcon from '../assets/images/educationIcon.png';
import startIcon from '../assets/images/startIcon.png';
import deadlineIcon from '../assets/images/deadlineIcon.png';

export const membersMenuItems = ['Name / Direction', 'Education', 'Start', 'Age', 'Email', 'Actions'];
export const membersBody = [
  {
    name: 'Create the DB',
    direction: 'JAVA',
    education: 'BSUIR',
    educationImg: educationIcon,
    start: '28.01.2021',
    startImg: startIcon,
    age: '21',
    email: 'johndoe@design.com',
    buttons: 'buttons',
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
