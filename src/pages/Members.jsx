import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { MemberManager } from '../components/Popups/MemberManager';
import { MainContext } from '../services/context';

export function Members() {
  return (
    <MainContext.Consumer>
      {({ members, edit, openModal, tasks, selected, closeEdit, updateTasks, addData, editData, saveData }) => (
        <article>
          {openModal ? (
            <MemberManager
              members={members}
              tasks={tasks}
              updateTasks={updateTasks}
              closeEdit={closeEdit}
              addData={addData}
              editData={editData}
              saveData={saveData}
              edit={edit}
              selected={selected}
            />
          ) : null}
          <Header addButton text='Register'>{`Members (${members.length})`}</Header>
          <Table>members</Table>
        </article>
      )}
    </MainContext.Consumer>
  );
}
