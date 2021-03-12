import PropTypes from 'prop-types';
import { Hamburger } from '../Buttons/Hamburger/Hamburger';
import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';
import { logOutFirebase } from '../../services/services';

export function Header({ children, addButton, text }) {
  return (
    <MainContext.Consumer>
      {({ drawerToggle, openEdit, drawerOpen }) => (
        <>
          <header className='header'>
            <div>
              <Hamburger drawerOpen={drawerOpen} drawerToggle={drawerToggle} />
              {addButton ? (
                <Button onClick={() => openEdit(false)} className='button dev'>
                  {text}
                </Button>
              ) : null}
            </div>
            <Button onClick={logOutFirebase} className='button danger'>
              Log Out
            </Button>
          </header>
          <p className='page-name'>{children}</p>
        </>
      )}
    </MainContext.Consumer>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  addButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
