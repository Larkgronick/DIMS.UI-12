import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskTrackManager } from '../components/Popups/TaskTrackManager';
import { MainContext } from '../services/context';

export function UserTasks() {
  return (
    <MainContext.Consumer>
      {({ members, tasks, userTasks, userIndex, track, openModal, selected, closeEdit, addTaskData }) => (
        <article>
          {openModal ? (
            <TaskTrackManager
              tasks={tasks}
              userTasks={userTasks}
              members={members}
              track={track}
              userIndex={userIndex}
              addTaskData={addTaskData}
              closeEdit={closeEdit}
            />
          ) : null}
          <Header>{`${members[selected].name} ${members[selected].lastName}'s Tasks (${userTasks.length})`}</Header>
          <Table>users</Table>
        </article>
      )}
    </MainContext.Consumer>
  );
}
