import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { MemberManager } from '../components/Popups/MemberManager';

export function Members() {
  const {
    modal: { openModal },
    main: { role, members },
  } = useSelector((state) => state);

  return (
    <article>
      {openModal ? <MemberManager /> : null}
      <Header role={role} text='Register'>{`Members (${members.length})`}</Header>
      <Table>members</Table>
    </article>
  );
}
