import PropTypes from 'prop-types';
import { menuItems } from '../../services/constants';
import { MembersTable } from './MembersTable';
import { TasksTable } from './TasksTable';
import { ProgressTable } from './ProgressTable';
import { UserTasksTable } from './UserTasksTable';
import { TaskTrackTable } from './TaskTrackTable';
import { SettingsTable } from './SettingsTable';

export function Table({ children }) {
  const renderTable = (page) => {
    const table = {
      members: <MembersTable />,
      tasks: <TasksTable />,
      progress: <ProgressTable />,
      users: <UserTasksTable />,
      taskTracks: <TaskTrackTable />,
      settings: <SettingsTable />,
    };
    return table[page];
  };

  return (
    <table className='table'>
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
