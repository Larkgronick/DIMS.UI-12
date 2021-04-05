import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskManager } from '../components/Popups/TaskManager';

export function Tasks() {
  const {
    modal: { openModal },
    main: { role, tasks },
  } = useSelector((state) => state);

  return (
    <article>
      {openModal ? <TaskManager /> : null}
      <Header role={role} text='Create'>{`Dev Incubator Tasks (${tasks.length})`}</Header>
      <Table>tasks</Table>
    </article>
  );
}
