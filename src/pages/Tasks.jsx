import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { TaskManager } from '../components/Popups/TaskManager';
import { MainContext } from '../services/context';

export function Tasks() {
  return (
    <MainContext.Consumer>
      {({ members, tasks, edit, openModal, selected, closeEdit, addData, editData, saveData }) => (
        <article>
          {openModal ? (
            <TaskManager
              tasks={tasks}
              members={members}
              closeEdit={closeEdit}
              addData={addData}
              editData={editData}
              saveData={saveData}
              edit={edit}
              selected={selected}
            />
          ) : null}
          <Header addButton text='Create'>{`Dev Incubator Tasks (${tasks.length})`}</Header>
          <Table>tasks</Table>
        </article>
      )}
    </MainContext.Consumer>
  );
}
