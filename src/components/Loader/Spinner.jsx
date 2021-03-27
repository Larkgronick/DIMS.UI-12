import PropTypes from 'prop-types';
import './Spinner.scss';
import Loader from 'react-loader-spinner';

export function Spinner({ visible }) {
  return <Loader visible={visible} type='Grid' color='green' height={70} width={70} className='spinner' />;
}

Spinner.propTypes = {
  visible: PropTypes.bool.isRequired,
};
