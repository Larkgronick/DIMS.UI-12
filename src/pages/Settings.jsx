import './styles/Table.scss';
import { Header } from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { MainDataContext } from '../contexts/MainDataContext';
import { images } from '../services/constants';

export function Settings() {
  return (
    <MainDataContext.Consumer>
      {({ userData }) => (
        <article>
          <Header>
            <img src={images.userIcon} alt='members-icon' />
            {`${userData.name} ${userData.lastName}`}
          </Header>
          <Table>settings</Table>
        </article>
      )}
    </MainDataContext.Consumer>
  );
}
