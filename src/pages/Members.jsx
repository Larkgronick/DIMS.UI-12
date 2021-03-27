import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { MemberManager } from '../components/Popups/MemberManager';
import { MainDataContext } from '../contexts/MainDataContext';
import { ModalContext } from '../contexts/ModalContext';
import { UserTasksContext } from '../contexts/UserTasksContext';

export function Members() {
  return (
    <MainDataContext.Consumer>
      {({ members, tasks, saveData }) => (
        <ModalContext.Consumer>
          {({ edit, openModal, closeEdit, selected }) => (
            <UserTasksContext.Consumer>
              {({ userData }) => (
                <article>
                  {openModal ? (
                    <MemberManager
                      members={members}
                      tasks={tasks}
                      closeEdit={closeEdit}
                      saveData={saveData}
                      edit={edit}
                      selected={selected}
                    />
                  ) : null}
                  <Header role={userData.role} text='Register'>{`Members (${members.length})`}</Header>
                  <Table>members</Table>
                </article>
              )}
            </UserTasksContext.Consumer>
          )}
        </ModalContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
