import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBopCcUzk7G_4BdtUFnSiN20-zOqjzzq_w",
    authDomain: "listappkara-175e3.firebaseapp.com",
    databaseURL: "https://listappkara-175e3.firebaseio.com",
    projectId: "listappkara-175e3",
    storageBucket: "listappkara-175e3.appspot.com",
    messagingSenderId: "236880475531",
    appId: "1:236880475531:web:fc072453474f4e7449ab8e",
    measurementId: "G-7TZ5Y328K7"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {email} = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
      console.log('error creating user');
    }
  }
  return userRef;
}

export const createListDocument = async () => {
  const loggedInUser = await getCurrentUser();
  if(!loggedInUser) return;
  await firestore.collection("lists").doc().set({
    owner: "asd",
    members: ["asd"],
    content: ["thecontent"],
    listName: 'list1'
  });
  console.log("list created");
}


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;