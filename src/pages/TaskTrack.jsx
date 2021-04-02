import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { MainDataContext } from '../contexts/MainDataContext';
import { ModalContext } from '../contexts/ModalContext';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function TaskTrack() {
  return (
    <MainDataContext.Consumer>
      {({ theme }) => (
        <UserTasksContext.Consumer>
          {({ userTasks, userTracks, saveTrackData }) => (
            <ModalContext.Consumer>
              {({ openModal, edit, closeEdit, track, subtask }) => (
                <article>
                  {openModal ? (
                    <TaskTrackManager
                      subtask={subtask}
                      userTasks={userTasks}
                      userTracks={userTracks}
                      saveTrackData={saveTrackData}
                      track={track}
                      closeEdit={closeEdit}
                      edit={edit}
                      theme={theme}
                    />
                  ) : null}
                  <Header>{`Task Tracks for '${userTasks[track].name}' Task`}</Header>
                  <Table>taskTracks</Table>
                </article>
              )}
            </ModalContext.Consumer>
          )}
        </UserTasksContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
