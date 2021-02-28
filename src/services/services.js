import firebase from './firebase';

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
