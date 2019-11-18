import * as firebase from 'firebase';
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    STORAGE_BUCKET,
} from 'react-native-dotenv';

const connection = firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    storageBucket: STORAGE_BUCKET,
});

export default connection;
