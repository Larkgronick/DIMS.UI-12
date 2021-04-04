import './styles/Table.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeEdit } from '../store/actions/modalAction';
import { saveTrackData } from '../store/actions/userDataAction';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';

export function UserTasks() {
  const dispatch = useDispatch();

  const {
    modal: { openModal, track, subtask },
    user: { memberData, userTasks, userTracks },
    main: { theme },
  } = useSelector((state) => state);

  const close = () => {
    return dispatch(closeEdit());
  };

  const save = (data, action) => {
    return dispatch(saveTrackData(userTracks, data, track, subtask, action));
  };

  return (
    <article>
      {openModal ? (
        <TaskTrackManager
          userTasks={userTasks}
          userTracks={userTracks}
          track={track}
          close={close}
          save={save}
          theme={theme}
        />
      ) : null}
      <Header>{`${memberData.name} ${memberData.lastName}'s Tasks (${userTasks.length})`}</Header>
      <Table>users</Table>
    </article>
  );
}
