import './styles/Table.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeEdit } from '../store/actions/modalAction';
import { saveTrackData } from '../store/actions/userDataAction';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';

export function TaskTrack() {
  const dispatch = useDispatch();

  const {
    modal: { openModal, edit, subtask, track },
    user: { userTasks, userTracks },
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
          subtask={subtask}
          userTasks={userTasks}
          userTracks={userTracks}
          save={save}
          track={track}
          close={close}
          edit={edit}
          theme={theme}
        />
      ) : null}
      <Header>{`Task Tracks for '${userTasks[track].name}' Task`}</Header>
      <Table>taskTracks</Table>
    </article>
  );
}
