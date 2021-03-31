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
import { Spinner } from '../Loader/Spinner';
import { UserTasksContext } from '../../contexts/UserTasksContext';

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
    <UserTasksContext.Consumer>
      {({ isLoading }) => (
        <>
          <Spinner visible={isLoading} />
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
        </>
      )}
    </UserTasksContext.Consumer>
  );
}

Table.propTypes = {
  children: PropTypes.string.isRequired,
};
