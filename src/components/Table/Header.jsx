import PropTypes from 'prop-types';
import { Hamburger } from '../Buttons/Hamburger/Hamburger';
import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';
import { logOutFirebase } from '../../services/services';

export function Header({ children, addButton, text }) {
  return (
    <MainContext>
      {({ drawerToggle, openEdit, showDrawer }) => (
        <>
          <header className='header'>
            <div>
              <Hamburger showDrawer={showDrawer} drawerToggle={drawerToggle} />
              {addButton ? (
                <Button action={openEdit} styles='button dev'>
                  {text}
                </Button>
              ) : null}
            </div>
            <Button action={logOutFirebase} styles='button danger'>
              Log Out
            </Button>
          </header>
          <p className='page-name'>{children}</p>
        </>
      )}
    </MainContext>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  addButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
