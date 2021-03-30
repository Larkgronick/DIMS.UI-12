import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskManager } from '../components/Popups/TaskManager';
import { MainDataContext } from '../contexts/MainDataContext';
import { ModalContext } from '../contexts/ModalContext';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function Tasks() {
  return (
    <MainDataContext.Consumer>
      {({ userData, members, tasks, saveData }) => (
        <ModalContext.Consumer>
          {({ edit, openModal, closeEdit, selected }) => (
            <UserTasksContext.Consumer>
              {({ addUserTasks }) => (
                <article>
                  {openModal ? (
                    <TaskManager
                      tasks={tasks}
                      members={members}
                      closeEdit={closeEdit}
                      saveData={saveData}
                      addUserTasks={addUserTasks}
                      edit={edit}
                      selected={selected}
                    />
                  ) : null}
                  <Header role={userData.role} text='Create'>{`Dev Incubator Tasks (${tasks.length})`}</Header>
                  <Table>tasks</Table>
                </article>
              )}
            </UserTasksContext.Consumer>
          )}
        </ModalContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
