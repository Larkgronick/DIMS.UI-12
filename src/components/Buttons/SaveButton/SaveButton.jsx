import PropTypes from 'prop-types';
import { Button } from '../Button/Button';

export const SaveButton = ({ children, ...restProps }) => <Button {...restProps}>{children}</Button>;

SaveButton.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
SaveButton.defaultProps = {
  children: 'Save',
};
