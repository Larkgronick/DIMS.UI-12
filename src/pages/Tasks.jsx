import './styles/Table.scss';
import { useSelector, useDispatch } from 'react-redux';
import { closeEdit } from '../store/actions/modalAction';
import { loadUserData } from '../store/actions/userDataAction';
import { saveData } from '../store/actions/mainDataAction';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskManager } from '../components/Popups/TaskManager';

export function Tasks() {
  const dispatch = useDispatch();
  const {
    modal: { openModal, edit, selected },
    main: { theme, role, members, tasks },
  } = useSelector((state) => state);

  const close = () => {
    return dispatch(closeEdit());
  };

  const load = () => {
    return dispatch(loadUserData());
  };

  const save = (data, isNew) => {
    return dispatch(saveData(tasks, 'tasks', data, selected, isNew));
  };

  return (
    <article>
      {openModal ? (
        <TaskManager
          tasks={tasks}
          members={members}
          save={save}
          load={load}
          close={close}
          edit={edit}
          selected={selected}
          theme={theme}
        />
      ) : null}
      <Header role={role} text='Create'>{`Dev Incubator Tasks (${tasks.length})`}</Header>
      <Table>tasks</Table>
    </article>
  );
}
