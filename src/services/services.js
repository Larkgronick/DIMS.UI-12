import firebase, { db } from './firebase';
import { convertDate, getIndex, getCurrentDate } from './helpers';

export const signInFirebase = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);

    return response;
  } catch (error) {
    console.error('Error with login: ', error);

    return error;
  }
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(console.error);
};

export const logOutFirebase = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('Error with signout: ', error);
  }
};

export const registerNewUser = async (email, password) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().sendPasswordResetEmail(email);
    return response;
  } catch (error) {
    console.error('Error with registration:', error);
    return null;
  }
};

export const setData = async (field, value) => {
  db.collection('data')
    .doc(field)
    .set(
      {
        [field]: value,
      },
      { merge: true },
    )
    .then(() => {
      console.error(`${field} data is written!`);
    })
    .catch((error) => {
      console.error('Error with saving:', error);
    });
};

export const loadData = async (field) => {
  const data = await db.collection('data').doc(field);

  return data
    .get()
    .then((doc) => {
      if (doc.exists) {
        return Object.values(doc.data())[0];
      }
      console.error(`Cannot find ${field} data`);

      return null;
    })
    .catch((error) => {
      console.error('Error with data loading:', error);
    });
};

export const addUserTasks = (taskId, assigners) => {
  let tracks = [];
  assigners.forEach((id) => {
    const track = {};
    track.userId = id;
    track.taskId = taskId;
    track.trackName = ['My first track...'];
    track.date = [convertDate(getCurrentDate())];
    track.note = ['My first note...'];
    track.status = 'active';
    tracks = tracks.concat([track]);
  });
  setUserTracks(taskId, tracks);
};

export const setUserTracks = async (field, value) => {
  db.collection('data')
    .doc('userTracks')
    .set(
      {
        [field]: value,
      },
      { merge: true },
    )
    .then(() => {
      console.error(`${field} data is written!`);
    })
    .catch((error) => {
      console.error('Error with saving:', error);
    });
};

export const clearUserTracks = (field) => {
  db.collection('data')
    .doc('userTracks')
    .update({
      [field]: firebase.firestore.FieldValue.delete(),
    })
    .then(() => {
      console.error(`${field} tracks successfully deleted!`);
    });
};

export const loadMemberData = async (e) => {
  const members = await loadData('members');
  const tasks = await loadData('tasks');
  const email = await getUserEmail();
  let userData;
  let userIndex;

  if (e) {
    userIndex = getIndex(e);
    userData = members[getIndex(e)];
  } else {
    userData = members.find((el) => el.email === email);
    userIndex = members.indexOf(userData);
  }

  const userTasks = tasks.filter((el) => el.assigners.includes(members[userIndex].id));
  const userTracks = await loadUserTracks(userData.id);

  return { userData, userTasks, userTracks };
};

export const loadUserTracks = async (id) => {
  const data = await db.collection('data').doc('userTracks');
  return data
    .get()
    .then((doc) => {
      if (doc.exists) {
        let tasks = Object.keys(doc.data())
          .sort()
          .reduce((obj, key) => {
            obj[key] = doc.data()[key];
            return obj;
          }, {});
        tasks = Object.values(tasks);
        tasks = tasks.map((el) => el.find(({ userId }) => userId === id));
        tasks = tasks.filter((el) => el);
        return tasks;
      }
      console.error(`Cannot find ${id} data`);

      return null;
    })
    .catch((error) => {
      console.error('Error with data loading:', error);
    });
};

export const saveUserTrack = async (track, value) => {
  db.collection('data')
    .doc('userTracks')
    .set(
      {
        [track]: value,
      },
      { merge: true },
    )
    .then(() => {
      console.error(`${track} data is written!`);
    })
    .catch((error) => {
      console.error('Error with saving:', error);
    });
};

export const saveChanges = async (track) => {
  const task = track.taskId;
  let data = await db.collection('data').doc('userTracks').get();
  data = await data.data();
  const toChange = data[task].findIndex(({ userId }) => userId === track.userId);
  data[task][toChange] = track;
  saveUserTrack(task, data[task]);
};

export const getUserEmail = () => {
  const data = firebase.auth().currentUser.email;
  return data;
};
