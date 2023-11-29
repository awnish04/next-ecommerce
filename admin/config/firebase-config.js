
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCraPPiwsETyns33uNd1KDpLoXCnkyN-2o",
  authDomain: "next-ecommerce-406116.firebaseapp.com",
  projectId: "next-ecommerce-406116",
  storageBucket: "next-ecommerce-406116.appspot.com",
  messagingSenderId: "400517941033",
  appId: "1:400517941033:web:119fb837739f0e307e1938",
};
const app = initializeApp(firebaseConfig);
export { firebaseConfig };

