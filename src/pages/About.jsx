import './styles/Table.scss';
import Header from '../components/Table/Header';
import { Table } from '../components/Table/Table';

export function About() {
  return (
    <article>
      <Header>Welcome to DIMS!</Header>
      <Table>howto</Table>
      <Table>about</Table>
    </article>
  );
}
