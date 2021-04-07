import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { MemberManager } from '../components/Popups/MemberManager';
import { Confirm } from '../components/Popups/Confirm';

export function Members() {
  const {
    modal: { openModal, openConfirm },
    main: { role, members },
  } = useSelector((state) => state);

  return (
    <article>
      {openModal ? <MemberManager /> : null}
      {openConfirm ? <Confirm /> : null}
      <Header role={role} text='Register'>{`Members (${members.length})`}</Header>
      <Table>members</Table>
    </article>
  );
}
