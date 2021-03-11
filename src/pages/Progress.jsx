import { useContext } from 'react';
import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { MainContext } from '../services/context';
import { Table } from '../components/Table/Table';

export function Progress() {
  const context = useContext(MainContext);
  const { members, userTasks, selected } = context;
  return (
    <MainContext.Consumer>
      {() => (
        <article>
          <Header>{`${members[selected].name} ${members[selected].lastName}'s Progress (${userTasks.length})`}</Header>
          <Table>progress</Table>
        </article>
      )}
    </MainContext.Consumer>
  );
}
