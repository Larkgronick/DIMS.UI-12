import { SET_THEME, LOGIN, SWITCH_THEME, SAVE_DATA, DELETE_DATA } from '../types';

const initialState = {
  isLogged: false,
  members: [],
  tasks: [],
  role: '',
  name: '',
  lastName: '',
  email: '',
  theme: 'dark',
};

export default function mainDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
    case LOGIN:
    case SWITCH_THEME:
    case SAVE_DATA:
    case DELETE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
