import { DRAWER_TOGGLE, DRAWER_CLOSE } from '../types';

export const drawerToggle = () => {
  return {
    type: DRAWER_TOGGLE,
  };
};

export const drawerClose = () => {
  return {
    type: DRAWER_CLOSE,
  };
};
