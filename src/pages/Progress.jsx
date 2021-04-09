import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';

export function Progress() {
  const { userTasks, memberData } = useSelector((state) => state.user);

  return (
    <article>
      <Header>{`${memberData.name} ${memberData.lastName}'s Progress (${userTasks.length})`}</Header>
      <Table>progress</Table>
    </article>
  );
}
