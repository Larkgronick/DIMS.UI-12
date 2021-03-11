import firebase, { db } from './firebase';

export const signInFirebase = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);

    return response;
  } catch (error) {
    console.error('Error with login: ', error);

    return null;
  }
};

export const logOutFirebase = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('Error with signout: ', error);
  }
};

export const registerNewUser = async (email, password) => {
  console.log(email, password);
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().sendPasswordResetEmail(email);
    return response;
  } catch (error) {
    throw new Error('Error with registration:', error);
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
      console.log(`${field} data is written!`);
    })
    .catch((error) => {
      console.log('Error with saving:', error);
    });
};

export const loadData = async (field) => {
  const data = await db.collection('data').doc(field);

  return data
    .get()
    .then((doc) => {
      if (doc.exists) {
        return Object.values(doc.data());
      }
      console.log(`Cannot find ${field} data`);

      return null;
    })
    .catch((error) => {
      console.log('Error with data loading:', error);
    });
};

export const getUserEmail = () => {
  const data = firebase.auth().currentUser.email;
  return data;
};
