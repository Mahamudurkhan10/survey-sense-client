
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvTsgZxfbskUxizAX4r-jho7pUza75xSU",
  authDomain: "survey-sense.firebaseapp.com",
  projectId: "survey-sense",
  storageBucket: "survey-sense.appspot.com",
  messagingSenderId: "407632469251",
  appId: "1:407632469251:web:0bc75e8106a9c089ae9d36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)