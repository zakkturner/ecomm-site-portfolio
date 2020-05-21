import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDKXeL4rT6pPqUlcktQeEbnGM2UWw1Jduw",
  authDomain: "crwn-clothing-99c01.firebaseapp.com",
  databaseURL: "https://crwn-clothing-99c01.firebaseio.com",
  projectId: "crwn-clothing-99c01",
  storageBucket: "crwn-clothing-99c01.appspot.com",
  messagingSenderId: "1076764505118",
  appId: "1:1076764505118:web:f89a9cbcae8c8ee3a52a0f",
  measurementId: "G-FLL11B4R7P",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
