import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { ModalContext } from '../contexts/ModalContext';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function UserTasks() {
  return (
    <ModalContext>
      {({ openModal, closeEdit, track }) => (
        <UserTasksContext.Consumer>
          {({ userTasks, userTracks, memberData, saveTrackData }) => {
            return (
              <article>
                {openModal ? (
                  <TaskTrackManager
                    userTasks={userTasks}
                    userTracks={userTracks}
                    saveTrackData={saveTrackData}
                    track={track}
                    closeEdit={closeEdit}
                  />
                ) : null}
                <Header>{`${memberData.name} ${memberData.lastName}'s Tasks (${userTasks.length})`}</Header>
                <Table>users</Table>
              </article>
            );
          }}
        </UserTasksContext.Consumer>
      )}
    </ModalContext>
  );
}
