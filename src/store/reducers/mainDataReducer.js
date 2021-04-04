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
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case SWITCH_THEME:
      return {
        ...state,
        ...action.payload,
      };

    case SAVE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case DELETE_DATA:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
