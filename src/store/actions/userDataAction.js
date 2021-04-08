import { SHOW_USER_TASKS, SHOW_LOADER, SAVE_TRACK_DATA, SET_TASK_STATUS, LOAD_USER_DATA } from '../types';
import { loadMemberData, saveChanges } from '../../services/services';

export const showUserTasks = (e) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader(true));
      const { userData, userTasks, userTracks } = await loadMemberData(e);
      const payload = {
        memberData: userData,
        userTasks,
        userTracks,
        isLoading: false,
      };
      return dispatch({
        type: SHOW_USER_TASKS,
        payload,
      });
    } catch (err) {
      console.err(err);
    }
    return dispatch(showLoader(false));
  };
};

export const showLoader = (isLoading) => {
  return {
    type: SHOW_LOADER,
    payload: { isLoading },
  };
};

export const saveTrackData = (userTracks, data, track, subtask, action) => {
  const { trackName, note, date, taskId, status, userId } = userTracks[track];
  const newTrack = {
    taskId,
    status,
    userId,
  };
  const newUserTracks = { ...userTracks };
  if (action === 'save') {
    newTrack.trackName = trackName.concat([data.trackName]);
    newTrack.note = note.concat([data.note]);
    newTrack.date = date.concat([data.date]);
  } else if (action === 'edit') {
    newTrack.trackName = trackName;
    newTrack.trackName[subtask] = data.trackName;
    newTrack.date = date;
    newTrack.date[subtask] = data.date;
    newTrack.note = note;
    newTrack.note[subtask] = data.note;
  } else if (action === 'delete') {
    newTrack.trackName = trackName.filter((el, i) => i !== subtask);
    newTrack.note = note.filter((el, i) => i !== subtask);
    newTrack.date = date.filter((el, i) => i !== subtask);
  }

  newUserTracks[track] = newTrack;
  saveChanges(newTrack);

  return { type: SAVE_TRACK_DATA, payload: { userTracks: newUserTracks } };
};

export const setTaskStatus = (taskNumber, value, index, userTracks) => {
  const newTracks = userTracks.map((el, i) => {
    if (i === index) {
      el.status = value;
    }
    return el;
  });

  saveChanges(newTracks[taskNumber]);

  return { type: SET_TASK_STATUS, payload: { userTracks: newTracks } };
};

export const loadUserData = () => {
  const payload = {};
  loadMemberData()
    .then((res) => {
      const { userData } = res;
      payload.memberData = userData;
    })
    .catch(console.err);
  return {
    type: LOAD_USER_DATA,
    payload,
  };
};
