import PropTypes from 'prop-types';
import './styles/Main.scss';
import { Route } from 'react-router-dom';
import { Login } from './Login';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { Progress } from './Progress';

export function Main({ showDrawer, toggle }) {
  return (
    <main className={showDrawer ? 'drawer-open' : ''}>
      <Route path='/' component={Login} />
      <Route path='/members' component={() => <Members showDrawer={showDrawer} toggle={toggle} />} />
      <Route path='/tasks' component={() => <Tasks showDrawer={showDrawer} toggle={toggle} />} />
      <Route path='/progress' component={() => <Progress showDrawer={showDrawer} toggle={toggle} />} />
    </main>
  );
}

Main.propTypes = {
  toggle: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};
