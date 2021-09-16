import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBGXmBAGMjrUDuAaz3SA08EDNqeAFMYd-g',
  authDomain: 'programming-quiz-multiplayer.firebaseapp.com',
  projectId: 'programming-quiz-multiplayer',
  storageBucket: 'programming-quiz-multiplayer.appspot.com',
  messagingSenderId: '243201537309',
  appId: '1:243201537309:web:6762a045069a4585df1df4',
});

export const auth = app.auth();
export default app
