import PropTypes from 'prop-types';
import { menuItems } from '../../services/constants';
import { MembersTable } from './MembersTable';
import { TasksTable } from './TasksTable';
import { ProgressTable } from './ProgressTable';
import { UserTasksTable } from './UserTasksTable';
import { TaskTrackTable } from './TaskTrackTable';
import { SettingsTable } from './SettingsTable';
import { AboutTable } from './AboutTable';
import { HowToTable } from './HowToTable';

const table = {
  members: <MembersTable />,
  tasks: <TasksTable />,
  progress: <ProgressTable />,
  users: <UserTasksTable />,
  taskTracks: <TaskTrackTable />,
  settings: <SettingsTable />,
  about: <AboutTable />,
  howto: <HowToTable />,
};

export function Table({ children }) {
  const renderTable = (page) => {
    return table[page];
  };

  return (
    <table className={children === 'settings' ? 'table settings' : 'table'}>
      <thead className='table-head'>
        <tr>
          {menuItems[children].map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      {renderTable(children)}
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.string.isRequired,
};
