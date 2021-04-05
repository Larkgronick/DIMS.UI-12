import { SET_THEME, LOGIN, SWITCH_THEME, SAVE_DATA, DELETE_DATA } from '../types';
import { loadData, loadMemberData, setData, clearUserTracks } from '../../services/services';
import { getIndex } from '../../services/helpers';

export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: { theme },
  };
};

export const login = (user) => {
  return async (dispatch) => {
    if (user) {
      const { userData } = await loadMemberData();
      const { role, name, lastName, email } = userData;
      const members = await loadUsersData('members');
      const tasks = await loadUsersData('tasks');

      return dispatch({
        type: LOGIN,
        payload: { isLogged: true, role, name, lastName, email, members, tasks },
      });
    }
    return dispatch({
      type: LOGIN,
      payload: { isLogged: false },
    });
  };
};

export const loadUsersData = (field) => {
  return loadData(field)
    .then((data) => data)
    .catch(console.log);
};

export const switchTheme = (isLight) => {
  console.log(isLight);
  if (isLight) {
    return {
      type: SWITCH_THEME,
      payload: { theme: 'light' },
    };
  }

  return {
    type: SWITCH_THEME,
    payload: { theme: 'dark' },
  };
};

export const saveData = (category, field, value, selected, isNew) => {
  const current = category;
  let newState;
  if (isNew) {
    newState = [...current].concat([value]);
  } else {
    newState = [...current];
    newState[selected] = value;
  }

  setData(field, newState);

  return {
    type: SAVE_DATA,
    payload: { [field]: newState },
  };
};

export const deleteData = (category, e, field) => {
  const current = category;
  const { name } = current[getIndex(e)];
  if (window.confirm('Are you sure you wish to delete this item?')) {
    const removed = current.filter((item, index) => index !== getIndex(e));

    if (field === 'tasks') {
      clearUserTracks(name);
    }
    setData(field, removed);
    return {
      type: DELETE_DATA,
      payload: { [field]: removed },
    };
  }
  return { type: DELETE_DATA, payload: [field] };
};
