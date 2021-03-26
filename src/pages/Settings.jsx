import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function Settings() {
  return (
    <UserTasksContext.Consumer>
      {({ userData }) => (
        <article>
          <Header>{`${userData.name} ${userData.lastName}`}</Header>
          <Table>settings</Table>
        </article>
      )}
    </UserTasksContext.Consumer>
  );
}
