import PropTypes from 'prop-types';
import './styles/Main.css';
import { Route } from 'react-router-dom';
import { Login } from './Login';
import { Members } from './Members';
import { Tasks } from './Tasks';
import { Progress } from './Progress';

export function Main(props) {
  const { showDrawer, toggle } = props;
  let contentSlide;

  if (showDrawer) {
    contentSlide = 'drawer-open';
  }

  return (
    <main className={contentSlide}>
      <Route path='/' component={() => <Login />} />
      <Route path='/members' component={() => <Members showDrawer={showDrawer} toggle={toggle} />} />
      <Route path='/tasks' component={() => <Tasks showDrawer={showDrawer} toggle={toggle} />} />
      <Route path='/progress' component={() => <Progress showDrawer={showDrawer} toggle={toggle} />} />
    </main>
  );
}

Main.propTypes = {
  toggle: PropTypes.func,
  showDrawer: PropTypes.bool,
};

Main.defaultProps = {
  toggle: PropTypes.func,
  showDrawer: PropTypes.false,
};
