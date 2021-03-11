import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { MainContext } from '../services/context';
import { Table } from '../components/Table/Table';

export function Settings() {
  return (
    <MainContext.Consumer>
      {({ userData }) => (
        <article>
          <Header>{`${userData.name} ${userData.lastName}`}</Header>
          <Table>settings</Table>
        </article>
      )}
    </MainContext.Consumer>
  );
}
