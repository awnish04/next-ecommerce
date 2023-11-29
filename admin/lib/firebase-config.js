// Import the functions you need from the SDKs you need
import { initializeApp, getApps, deleteApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// Clear existing apps
getApps().forEach(app => {
  deleteApp(app);
});
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFmXOGg3Ka5C9wMkJ4JGNO_ZtnYoQ6a0w",
  authDomain: "next-ecommerce-admin-04.firebaseapp.com",
  projectId: "next-ecommerce-admin-04",
  storageBucket: "next-ecommerce-admin-04.appspot.com",
  messagingSenderId: "993865808389",
  appId: "1:993865808389:web:be22566f1ef28906483a6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);
