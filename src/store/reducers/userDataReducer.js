import { SHOW_USER_TASKS, SHOW_LOADER, SAVE_TRACK_DATA, SET_TASK_STATUS, LOAD_USER_DATA } from '../types';

const initialState = {
  memberData: [],
  userTasks: [],
  userTracks: [],
  isLoading: false,
};

export default function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_USER_TASKS:
      return {
        ...state,
        ...action.payload,
      };
    case SHOW_LOADER:
      return {
        ...state,
        ...action.payload,
      };

    case SAVE_TRACK_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case SET_TASK_STATUS:
      return {
        ...state,
        ...action.payload,
      };

    case LOAD_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
