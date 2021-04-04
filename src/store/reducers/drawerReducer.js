import { DRAWER_TOGGLE } from '../types';

const initialState = {
  drawerOpen: false,
};

export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case DRAWER_TOGGLE:
      return { drawerOpen: !state.drawerOpen };
    default:
      return state;
  }
}
