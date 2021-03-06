import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { Confirm } from '../components/Popups/Confirm';

export function TaskTrack() {
  const {
    modal: { openModal, track, openConfirm },
    user: { userTasks },
  } = useSelector((state) => state);

  return (
    <article>
      {openModal ? <TaskTrackManager /> : null}
      {openConfirm ? <Confirm /> : null}
      <Header>{`Task Tracks for '${userTasks[track].name}' Task`}</Header>
      <Table>taskTracks</Table>
    </article>
  );
}
