import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';

export function UserTasks() {
  const {
    modal: { openModal },
    user: { memberData, userTasks },
  } = useSelector((state) => state);

  return (
    <article>
      {openModal ? <TaskTrackManager /> : null}
      <Header>{`${memberData.name} ${memberData.lastName}'s Tasks (${userTasks.length})`}</Header>
      <Table>users</Table>
    </article>
  );
}
