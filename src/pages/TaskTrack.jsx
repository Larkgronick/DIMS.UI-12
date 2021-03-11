import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { MainContext } from '../services/context';

export function TaskTrack() {
  return (
    <MainContext.Consumer>
      {({
        members,
        tasks,
        userTasks,
        userIndex,
        track,
        subtask,
        edit,
        openModal,
        selected,
        closeEdit,
        saveTaskData,
      }) => {
        return (
          <article>
            {openModal ? (
              <TaskTrackManager
                tasks={tasks}
                subtask={subtask}
                userTasks={userTasks}
                saveTaskData={saveTaskData}
                members={members}
                track={track}
                userIndex={userIndex}
                closeEdit={closeEdit}
                edit={edit}
              />
            ) : null}
            <Header>{`${members[selected].name} ${members[selected].lastName}'s Task Tracks`}</Header>
            <Table>taskTracks</Table>
          </article>
        );
      }}
    </MainContext.Consumer>
  );
}
