import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { images } from '../services/constants';

export function Settings() {
  const {
    main: { name, lastName },
  } = useSelector((state) => state);
  return (
    <article>
      <Header>
        <img src={images.userIcon} alt='members-icon' />
        {`${name} ${lastName}`}
      </Header>
      <Table>settings</Table>
    </article>
  );
}
