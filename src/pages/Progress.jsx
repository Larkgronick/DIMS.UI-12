import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function Progress() {
  return (
    <UserTasksContext.Consumer>
      {({ userTasks, memberData }) => (
        <article>
          <Header>{`${memberData.name} ${memberData.lastName}'s Progress (${userTasks.length})`}</Header>
          <Table>progress</Table>
        </article>
      )}
    </UserTasksContext.Consumer>
  );
}
