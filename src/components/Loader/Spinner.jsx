import './Spinner.scss';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

export function Spinner() {
  const {
    user: { isLoading },
  } = useSelector((state) => state);
  return (
    <Loader visible={isLoading} type='Grid' color='green' height={70} width={70} className={isLoading && 'spinner'} />
  );
}
