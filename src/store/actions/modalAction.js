import { OPEN_EDIT, CLOSE_EDIT, SELECT_ITEM, OPEN_CONFIRM } from '../types';
import { getIndex } from '../../services/helpers';

export const openEdit = (e, isNew, field) => {
  const payload = {
    openModal: true,
  };
  if (field) {
    payload[field] = getIndex(e);
  }
  if (isNew) {
    payload.edit = true;
  }
  return {
    type: OPEN_EDIT,
    payload,
  };
};

export const openConfirmation = (page) => {
  return {
    type: OPEN_CONFIRM,
    payload: { page, openConfirm: true },
  };
};

export const closeEdit = () => {
  return {
    type: CLOSE_EDIT,
    payload: { edit: false, openModal: false, openConfirm: false },
  };
};

export const selectItem = (e, field) => {
  return {
    type: SELECT_ITEM,
    payload: { [field]: getIndex(e) },
  };
};
