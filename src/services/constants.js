import membersIcon from '../assets/images/membersIcon.png';
import tasksIcon from '../assets/images/tasksIcon.png';
import progressIcon from '../assets/images/progressIcon.png';
import settingsIcon from '../assets/images/settingsIcon.png';
import myTasksIcon from '../assets/images/myTasksIcon.png';

export const directions = ['JAVA', '.NET', 'Frontend'];
export const roles = ['Member', 'Mentor', 'Admin'];

export const membersBody = [
  {
    id: '1',
    direction: 'JAVA',
    name: 'Nikita',
    email: 'admin@dims-ui.by',
    lastName: 'Zhavoronkov',
    sex: 'male',
    education: 'BSUIR',
    birthDate: '1993-03-28',
    universityAverageScore: 100,
    mathScore: 20,
    address: 'Nekrasova str. 16',
    mobilePhone: '+3751835569',
    skype: 'balda',
    startDate: '2021-12-31',
    role: 'Admin',
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
    role: 'Member',
  },
];

export const tasksBody = [
  {
    assigners: ['1', '2'],
    status: ['active', 'active'],
    trackName: [{ items: ['start task', 'working hard'] }, { items: ['start task'] }],
    date: [{ items: ['2021-01-21', '2021-01-22'] }, { items: ['2021-01-23'] }],
    note: [{ items: ['start desc', 'working desc'] }, { items: ['start desc'] }],
    id: '1',
    name: 'Create the DB',
    start: '28.01.2021',
    deadline: '28.01.2021',
  },
  {
    assigners: ['1'],
    status: ['active'],
    trackName: [{ items: ['start task', 'do something'] }],
    date: [{ items: ['2021-01-21', '2021-01-25'] }],
    note: [{ items: ['start desc', 'do desc'] }],
    id: '2',
    name: 'Implement the props',
    start: '28.01.2021',
    deadline: '28.01.2021',
  },
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
  ],
  tasks: ['Name', 'Start', 'Deadline', 'Actions'],
  progress: ['Name', 'Track Name', 'Note', 'Date'],
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

export const scoreScale = new Array(100).fill().map((el, i) => i + 1);
