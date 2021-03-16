import PropTypes from 'prop-types';
import { menuItems } from '../../services/constants';
import { MembersTable } from './MembersTable';
import { TasksTable } from './TasksTable';
import { ProgressTable } from './ProgressTable';
import { UserTasksTable } from './UserTasksTable';
import { TaskTrackTable } from './TaskTrackTable';
import { SettingsTable } from './SettingsTable';

export function Table({ children }) {
  function renderTable(page) {
    switch (page) {
      case 'members':
        return <MembersTable />;
      case 'tasks':
        return <TasksTable />;
      case 'progress':
        return <ProgressTable />;
      case 'users':
        return <UserTasksTable />;
      case 'taskTracks':
        return <TaskTrackTable />;
      case 'settings':
        return <SettingsTable />;
      default:
        return null;
    }
  }

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