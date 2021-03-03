import membersIcon from '../assets/images/membersIcon.png';
import tasksIcon from '../assets/images/tasksIcon.png';
import progressIcon from '../assets/images/progressIcon.png';

export const directions = ['JAVA', '.NET', 'Frontend'];
export const roles = ['Member', 'Mentor', 'Admin'];

export const drawerMenuItems = [
  { name: 'Members', path: '/members', img: membersIcon },
  { name: 'Tasks', path: '/tasks', img: tasksIcon },
  { name: 'Progress', path: '/progress', img: progressIcon },
];

export const membersMenuItems = [
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
];
export const membersBody = [
  {
    id: '1',
    direction: 'JAVA',
    name: 'Vasya',
    email: 'johndoe@design.com',
    lastName: 'Lukov',
    sex: 'male',
    education: 'BSUIR',
    birthDate: '1993-03-28',
    universityAverageScore: 100,
    mathScore: 20,
    address: 'Nekrasova str. 16',
    mobilePhone: '+3751835569',
    skype: 'balda',
    startDate: '2021-12-31',
    role: '',
  },
  {
    id: '2',
    direction: 'JAVA',
    name: 'Petya',
    email: 'petya@badboy.com',
    lastName: 'Petrow',
    sex: 'male',
    education: 'BSU',
    birthDate: '1998-01-30',
    universityAverageScore: 88,
    mathScore: 100,
    address: 'Temiryazeva str',
    mobilePhone: '+3758895236',
    skype: 'tratatata',
    startDate: '2021-01-30',
    role: '',
  },
];
export const tasksMenuItems = ['Name', 'Start', 'Deadline', 'Actions'];
export const tasksBody = [
  {
    assigners: ['1', '2'],
    status: ['active', 'active'],
    trackName: [['start task', 'working hard'], ['start task']],
    date: [['2021-01-21', '2021-01-22'], ['2021-01-23']],
    note: [['start desc', 'working desc'], ['start desc']],
    id: '1',
    name: 'Create the DB',
    start: '28.01.2021',
    deadline: '28.01.2021',
  },
  {
    assigners: ['1'],
    status: ['active'],
    trackName: [['start task', 'do something']],
    date: [['2021-01-21', '2021-01-25']],
    note: [['start desc', 'do desc']],
    id: '2',
    name: 'Implement the props',
    start: '28.01.2021',
    deadline: '28.01.2021',
  },
];

export const progressMenuItems = ['Name', 'Track Name', 'Note', 'Date'];
export const usersMenuItems = ['Name', 'Start', 'Deadline', 'Status', 'Actions'];
export const taskTrackMenuItems = ['Track Name', 'Note', 'Date'];

export const scoreScale = new Array(100).fill().map((el, i) => i + 1);
