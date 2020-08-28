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
  if(!loggedInUser || newOwnersOf.length >= 10){
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

export const getMembersNameFromMembersId = async (idArray) => {
  const nameArray = await idArray.map(async id => {
    const memberDoc = await firestore.collection("users").doc(id).get();
    const memberData = await memberDoc.data();
    return memberData.displayName;
  });
  const resolvedNameArray = await Promise.all(nameArray);
  return resolvedNameArray;
};

export const getListDataFromId = async (listId) => {
  const listDoc = await firestore.collection("lists").doc(listId).get();
  const listData = await listDoc.data();
  return listData;
}

export const addNewItemToList = async (listId, item) => {
  const listDoc = await firestore.collection("lists").doc(listId).get();
  const listData = await listDoc.data();
  const {content} = listData;
  content.push(item);
  await firestore.collection("lists").doc(listId).set({
    content: content
  }, {merge:true});
  return;
};

export const deleteItemFromList = async (listId, itemIndex) => {
  const listDoc = await firestore.collection("lists").doc(listId).get();
  const listData = await listDoc.data();
  const {content} = listData;
  content.splice(itemIndex, 1);
  await firestore.collection("lists").doc(listId).set({
    content: content
  }, {merge:true});
  return;
}

export const addNewMemberToList = async (email, listId) => {
  //gettings members array from listId
  const listDoc = await firestore.collection("lists").doc(listId).get();
  const listData = await listDoc.data();
  const {members} = listData;
  if (members.length >= 50) {
    console.log("Could not add new member. Limit of 50 is reached.");
    return;
  }
  //getting the userId from email and 
  const userDocs = await firestore.collection("users").where("email", "==", email).get();
  const userId = userDocs.docs[0].id;
  const userDoc = userDocs.docs[0].data();
  const {membersOf} = await userDoc;
  membersOf.push(listId);
  //adding listId to that user's "membersOf"
  await firestore.collection("users").doc(userId).set({
    membersOf: membersOf
  }, {merge:true});
  //adding userId to list's "members"
  members.push(userId);
  await firestore.collection("lists").doc(listId).set({
    members: members
  }, {merge:true});

};

export const deleteMemberFromList = async (memberId, listId) => {
    //deleting memberId from list's members
    const listDoc = await firestore.collection("lists").doc(listId).get();
    const listData = await listDoc.data();
    const {members} = listData;
    const filteredMembers = members.filter(member => member != memberId);
    await firestore.collection("lists").doc(listId).set({
      members: filteredMembers
    }, {merge:true});
    //deleting listId from user
    const userDoc = await firestore.collection("users").doc(memberId).get();
    const userData = await userDoc.data();
    const {membersOf} = userData;
    const filteredLists = membersOf.filter(list => list != listId);
    await firestore.collection("users").doc(memberId).set({
      membersOf: filteredLists
    }, {merge:true});

};

export const leaveTheList = async (userId, listId) => {
  //deleting listId from user
  const userDoc = await firestore.collection("users").doc(userId).get();
  const userData = userDoc.data();
  const {membersOf, ownersOf} = userData;
  const filteredMembersOf = membersOf.filter(list => list != listId);
  const filteredOwnersOf = ownersOf.filter(list => list != listId);
  await firestore.collection("users").doc(userId).set({
    membersOf: filteredMembersOf,
    ownersOf: filteredOwnersOf
  }, {merge:true});
  //deleting user from list's members and owner
  const listDoc = await firestore.collection("lists").doc(listId).get();
  const listData = listDoc.data();
  let {members, owner} = listData;
  if(owner == userId){
    owner = members[1];
  };
  const filteredMembers = members.filter(member => member != userId);
  await firestore.collection("lists").doc(listId).set({
    members: filteredMembers,
    owner: owner
  }, {merge:true});
}

export const experimentFindDocumentFromEmail = async () => {
  const userDoc = await firestore.collection("users").where("email", "==", "karahan2@gmail.com").get();
  console.log(userDoc.docs[0].data()); //userDoc is a "where object" (not document object) , it has satisfiying documents as an array under the docs key
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