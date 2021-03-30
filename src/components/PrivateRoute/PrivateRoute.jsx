import PropTypes, { bool } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, condition, redirectPath, ...rest }) => (
  <Route {...rest} render={() => (condition ? <Component {...rest} /> : <Redirect to={redirectPath} />)} exact />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  condition: bool.isRequired,
  redirectPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  redirectPath: '/login',
};
