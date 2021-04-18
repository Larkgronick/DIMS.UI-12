import { SET_THEME, LOGIN, SWITCH_THEME, SAVE_DATA, DELETE_DATA, UPDATE_DATA } from '../types';
import { loadData, loadMemberData, setData, clearUserTracks, updateCategory } from '../../services/services';

export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: { theme },
  };
};

export const login = (user) => async (dispatch) => {
  if (user) {
    const data = await Promise.all([loadMemberData(), loadUsersData('members'), loadUsersData('tasks')]);
    const [userInfo, members, tasks] = data;
    const {
      userData: { role, name, lastName, email },
    } = userInfo;
    const payload = { isLogged: true, role, name, lastName, email, members, tasks };
    return dispatch({
      type: LOGIN,
      payload,
    });
  }
  return dispatch({
    type: LOGIN,
    payload: { isLogged: false },
  });
};

export const loadUsersData = (field) => {
  return loadData(field)
    .then((data) => data)
    .catch(console.log);
};

export const switchTheme = (isLight) => {
  return {
    type: SWITCH_THEME,
    payload: { theme: isLight ? 'light' : 'dark' },
  };
};

export const saveData = (category, field, value, selected, isNew) => {
  let newState;
  if (isNew) {
    newState = [...category].concat([value]);
  } else {
    newState = [...category];
    newState[selected] = value;
  }

  setData(field, newState);

  return {
    type: SAVE_DATA,
    payload: { [field]: newState },
  };
};

export const deleteData = (category, selected, field) => {
  const { name } = category[selected];
  const removed = category.filter((item, index) => index !== selected);
  if (field === 'tasks') {
    clearUserTracks(name);
  }
  setData(field, removed);
  return {
    type: DELETE_DATA,
    payload: { [field]: removed },
  };
};

export const updateData = (data, field) => {
  updateCategory(data, field);
  return {
    type: UPDATE_DATA,
    payload: { [field]: data },
  };
};
