import './styles/Table.scss';
import { useSelector, useDispatch } from 'react-redux';
import { closeEdit } from '../store/actions/modalAction';
import { saveData } from '../store/actions/mainDataAction';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { MemberManager } from '../components/Popups/MemberManager';

export function Members() {
  const dispatch = useDispatch();
  const {
    modal: { openModal, edit, selected },
    main: { theme, role, members, tasks },
  } = useSelector((state) => state);

  const close = () => {
    return dispatch(closeEdit());
  };

  const save = (data, isNew) => {
    return dispatch(saveData(members, 'members', data, selected, isNew));
  };

  return (
    <article>
      {openModal ? (
        <MemberManager
          members={members}
          tasks={tasks}
          close={close}
          save={save}
          edit={edit}
          selected={selected}
          theme={theme}
        />
      ) : null}
      <Header role={role} text='Register'>{`Members (${members.length})`}</Header>
      <Table>members</Table>
    </article>
  );
}
