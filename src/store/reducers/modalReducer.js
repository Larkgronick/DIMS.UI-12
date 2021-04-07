import { OPEN_EDIT, CLOSE_EDIT, SELECT_ITEM, OPEN_CONFIRM } from '../types';

const initialState = {
  openModal: false,
  edit: false,
  selected: 0,
  track: 0,
  subtask: 0,
  openConfirm: false,
  page: '',
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_EDIT:
      return {
        ...state,
        ...action.payload,
      };
    case CLOSE_EDIT:
      return {
        ...state,
        ...action.payload,
      };
    case SELECT_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case OPEN_CONFIRM:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
