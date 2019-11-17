import firebase from 'react-native-firebase';
import env from 'react-native-config';

const app = firebase.initializeApp({
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    databaseURL: env.databaseURL,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId
});

export default app;