import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let config = {
  apiKey: 'AIzaSyCaX8U0ZlCaRjWeGM8M9mmK2Ahk-d73tGA',
  authDomain: 'stock-management-e2596.firebaseapp.com',
  databaseURL: 'https://stock-management-e2596.firebaseio.com',
  projectId: 'stock-management-e2596',
  storageBucket: 'stock-management-e2596.appspot.com',
  messagingSenderId: '634804137177',
  appId: '1:634804137177:web:dd232e75ffafef7e0e62c8',
  measurementId: 'G-CYN2SNR87T'
};

const app = firebase.initializeApp(config);
export default app;
