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
        ownersOf: [],
        membersOf: [],
        ...additionalData
      })
    } catch(error){
      console.log('error creating user');
    }
  }
  return userRef;
}

export const createListDocumentAndAddIdToOwner = async (listName) => {
  const loggedInUser = await getCurrentUser();
  const userDoc = await firestore.collection("users").doc(loggedInUser.uid).get();
  const userData = await userDoc.data();
  const {membersOf, ownersOf} = userData;
  const newMembersOf = [...membersOf];
  const newOwnersOf = [...ownersOf];
  if(!loggedInUser || newOwnersOf.length >= 3){
    console.log('Number of owned lists = ' + newOwnersOf.length);
    console.log('List creation failed');
    return;
  } 
  const listDocumentRef = await firestore.collection("lists").add({
    owner: loggedInUser.uid,
    members: [loggedInUser.uid],
    content: [],
    listName: listName
  });
  newMembersOf.push(listDocumentRef.id);
  newOwnersOf.push(listDocumentRef.id);
  await firestore.collection("users").doc(loggedInUser.uid).set({
    membersOf: newMembersOf,
    ownersOf: newOwnersOf
  }, {merge: true});
  console.log("list created");
};

export const getEnrolledLists = async () => {
  const loggedInUser = await getCurrentUser();
  const userDoc = await firestore.collection("users").doc(loggedInUser.uid).get();
  const userData = await userDoc.data();
  const {membersOf, ownersOf} = userData;
  return {membersOf, ownersOf};
};

export const getListNamesFromListIds = async (arrayOfIds) => {
  const nameArray = await arrayOfIds.map(async id => {
    const listDoc = await firestore.collection("lists").doc(id).get();
    const listData = await listDoc.data();
    return listData.listName;
  });
  const resolvedNameArray = await Promise.all(nameArray); //makes it so that we dont return unresolved promises
  return resolvedNameArray;
};


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