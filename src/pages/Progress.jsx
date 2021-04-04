import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';

export function Progress() {
  const {
    user: { userTasks, memberData },
  } = useSelector((state) => state);
  return (
    <article>
      <Header>{`${memberData.name} ${memberData.lastName}'s Progress (${userTasks.length})`}</Header>
      <Table>progress</Table>
    </article>
  );
}
