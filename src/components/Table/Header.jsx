import PropTypes from 'prop-types';
import { Hamburger } from '../Buttons/Hamburger/Hamburger';
import { Button } from '../Buttons/Button/Button';
import { ModalContext } from '../../contexts/ModalContext';
import { DrawerContext } from '../../contexts/DrawerContext';
import { logOutFirebase } from '../../services/services';

export function Header({ children, role, text }) {
  return (
    <DrawerContext.Consumer>
      {({ drawerToggle, drawerOpen }) => (
        <ModalContext.Consumer>
          {({ openEdit }) => {
            const edit = (isNew) => {
              return (e) => openEdit(e, isNew);
            };
            return (
              <>
                <header className='header'>
                  <div>
                    <Hamburger drawerOpen={drawerOpen} drawerToggle={drawerToggle} />
                    {role === 'Admin' ? (
                      <Button onClick={edit(false)} className='button dev'>
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
            );
          }}
        </ModalContext.Consumer>
      )}
    </DrawerContext.Consumer>
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

Header.defaultProps = {
  children: null,
};
