import './styles/Table.scss';
import { useSelector } from 'react-redux';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';
import { images } from '../services/constants';

export function Settings() {
  const { name, lastName } = useSelector((state) => state.main);

  return (
    <article>
      <Header>{`${name} ${lastName}`}</Header>
      <Table>settings</Table>
      <img className='settings-icon' src={images.userIcon} alt='members-icon' />
    </article>
  );
}
