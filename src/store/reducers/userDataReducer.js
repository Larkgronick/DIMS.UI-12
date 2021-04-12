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
    case SHOW_LOADER:
    case SAVE_TRACK_DATA:
    case SET_TASK_STATUS:
    case LOAD_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
