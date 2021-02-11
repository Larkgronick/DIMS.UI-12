import firebase from 'firebase';

const initConfig = {
  apiKey: 'AIzaSyCIL1R3gAdVAHGJUzY7hOTY1sqzBnbc0Fk',
  authDomain: 'dims-ui-12.firebaseapp.com',
  projectId: 'dims-ui-12',
  storageBucket: 'dims-ui-12.appspot.com',
  messagingSenderId: '185987292760',
  appId: '1:185987292760:web:66702dc8335260b7e2342d',
  measurementId: 'G-XGGR77LZ2T',
};

const config = firebase.initializeApp(initConfig);

export default config;
