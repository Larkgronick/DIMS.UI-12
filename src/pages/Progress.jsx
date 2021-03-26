import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { ModalContext } from '../contexts/ModalContext';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function Progress() {
  return (
    <UserTasksContext>
      {({ userTasks, userData }) => (
        <ModalContext>
          {() => (
            <article>
              <Header>{`${userData.name} ${userData.lastName}'s Progress (${userTasks.length})`}</Header>
              <Table>progress</Table>
            </article>
          )}
        </ModalContext>
      )}
    </UserTasksContext>
  );
}
