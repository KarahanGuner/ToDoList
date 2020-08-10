import { createSlice } from '@reduxjs/toolkit';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        error: null
    },
    reducers: {
        signInWithGoogle: async state => {
            try {
                const {user} = await auth.signInWithPopup(googleProvider);
                userSlice.caseReducers.getSnapshotFromUserAuth(state, user);
            } catch(error) {
                state.error = error;
                console.log(error);
            }
        },
        signInWithEmail: async (state, action) => {
            const {email, password} = action.payload
            try {
                const {user} = await auth.signInWithEmailAndPassword(email, password);
                userSlice.caseReducers.getSnapshotFromUserAuth(state, {user:user, additionalData:null});
            } catch(error) {
                state.error = error;
                console.log(error);
            }
        },
        getSnapshotFromUserAuth: async (state, action) => {
            console.log('getSnapshotFromUserAuth dispatched');
            console.log(action.payload);
            const userAuth = action.payload.user;
            const additionalData = action.payload.additionalData;
            try {
                const userRef= await createUserProfileDocument(userAuth, additionalData)
                const userSnapshot = await userRef.get();
                state.user = {id: userSnapshot.id, ...userSnapshot.data}
            } catch(error) {
                state.error = error;
                console.log(error);
            }
        },
        signUp: async (state, action) => { //async functions cant mutate the state?
            const {email, password, displayName} = action.payload;
            try {
                const {user} = await auth.createUserWithEmailAndPassword(email, password);
                //await userSlice.caseReducers.getSnapshotFromUserAuth({user, displayName});
                const userRef= await createUserProfileDocument(user, {displayName});
                const userSnapshot = await userRef.get();
                state.user = {id: userSnapshot.id, ...userSnapshot.data()};
                console.log('======state.user======')
                console.log(state.user);
            } catch(error) {
                state.error = error;
                console.log(error);
            }
        },
    }
});


export const {
    signInWithGoogle,
    signInWithEmail,
    getSnapshotFromUserAuth,
    signUp
} = userSlice.actions;
export default userSlice.reducer;