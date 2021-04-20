import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskManager } from '../components/Popups/TaskManager';
import { Confirm } from '../components/Popups/Confirm';

export function Tasks() {
  const {
    modal: { openModal, openConfirm },
    main: { role, tasks },
  } = useSelector((state) => state);

  return (
    <article>
      {openModal ? <TaskManager /> : null}
      {openConfirm ? <Confirm /> : null}
      <Header role={role} text='Create'>{`Dev Incubator Tasks (${tasks.length})`}</Header>
      <Table>tasks</Table>
    </article>
  );
}
