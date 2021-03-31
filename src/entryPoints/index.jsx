import React from 'react';
import "styles/index.scss";
import ReactDOM from 'react-dom';
import App from 'src/App';
import firebase from "firebase/app";

// Use your config values to firebase here.
firebase.initializeApp({
  apiKey: "AIzaSyCxUbO4Qqe2X95z9IayISyxFs-msrPWo3g",
  authDomain: "project-fooddelivery.firebaseapp.com",
  projectId: "project-fooddelivery",
  storageBucket: "project-fooddelivery.appspot.com",
  messagingSenderId: "1056079093550",
  appId: "1:1056079093550:web:a6d0c4076581ddb56da4bf"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
