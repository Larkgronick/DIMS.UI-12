import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { openEdit } from '../../store/actions/modalAction';
import { drawerClose } from '../../store/actions/drawerAction';
import { Hamburger } from '../Buttons/Hamburger/Hamburger';
import { Button } from '../Buttons/Button/Button';
import { logOutFirebase } from '../../services/services';

export default function Header(props) {
  const { children, role, text } = props;

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);

  const edit = (isNew, selected) => (e) => dispatch(openEdit(e, isNew, selected));

  const logOut = () => {
    dispatch(drawerClose());
    logOutFirebase();
  };

  return (
    <>
      <header className='header'>
        <div>
          <Hamburger />
          {role === 'Admin' ? (
            <Button onClick={edit(false)} className='button dev'>
              {text}
            </Button>
          ) : null}
        </div>
        <Button onClick={logOut} className='button danger circle'>
          Log Out
        </Button>
      </header>
      <p className={!isLoading ? 'page-name' : 'hide-error'}>{children}</p>
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node,
  role: PropTypes.string,
  text: PropTypes.string,
};

Header.defaultProps = {
  children: null,
  role: 'Member',
  text: 'Create',
};
