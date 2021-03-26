import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { MemberManager } from '../components/Popups/MemberManager';
import { MainDataContext } from '../contexts/MainDataContext';
import { ModalContext } from '../contexts/ModalContext';

export function Members() {
  return (
    <MainDataContext.Consumer>
      {({ members, tasks, saveData }) => (
        <ModalContext.Consumer>
          {({ edit, openModal, closeEdit, selected }) => (
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
              <Header addButton='Admin' text='Register'>{`Members (${members.length})`}</Header>
              <Table>members</Table>
            </article>
          )}
        </ModalContext.Consumer>
      )}
    </MainDataContext.Consumer>
  );
}
