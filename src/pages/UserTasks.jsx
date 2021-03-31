import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { MainDataContext } from '../contexts/MainDataContext';
import { ModalContext } from '../contexts/ModalContext';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function UserTasks() {
  return (
    <MainDataContext.Consumer>
      {({ theme }) => (
        <ModalContext.Consumer>
          {({ openModal, closeEdit, track }) => (
            <UserTasksContext.Consumer>
              {({ userTasks, userTracks, memberData, saveTrackData }) => (
                <article>
                  {openModal ? (
                    <TaskTrackManager
                      userTasks={userTasks}
                      userTracks={userTracks}
                      saveTrackData={saveTrackData}
                      track={track}
                      closeEdit={closeEdit}
                      theme={theme}
                    />
                  ) : null}
                  <Header>{`${memberData.name} ${memberData.lastName}'s Tasks (${userTasks.length})`}</Header>
                  <Table>users</Table>
                </article>
              )}
            </UserTasksContext.Consumer>
          )}
        </ModalContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
