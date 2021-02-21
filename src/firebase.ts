// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

const analytics = (): firebase.analytics.Analytics => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  return firebase.analytics();
};

export default analytics;
