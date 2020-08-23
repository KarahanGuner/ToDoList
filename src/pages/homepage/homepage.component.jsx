import React, {useState} from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import AppPage from '../apppage/apppage.component';
import './homepage.styles.scss';

import { useSelector, useDispatch } from "react-redux"
import {setUser} from '../../redux/user/user.slice';

import { auth, getCurrentUser, getEnrolledLists } from '../../firebase/firebase.utils';


const HomePage = () => {
    const [hasAccount, toggleHasAccount] = useState(true);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    console.log('====user in homepage component=====');
    console.log(user);
    const handleSignout = async () => {
        await auth.signOut();
        dispatch(setUser(null));
    }
  
    const isLoggedIn = async () => {
        const loggedInUser = await getCurrentUser();
        console.log(loggedInUser);
    }

    const getLists = async () => {
        const lists = await getEnrolledLists();
        console.log(lists.membersOf);
        console.log(lists.ownersOf);
    }
    
    let signinOrSignUp;
    let toggleMessage;
    if (hasAccount) {
        signinOrSignUp = <SignIn/>;
        toggleMessage = 'I do not have an account';
    } else {
        signinOrSignUp = <SignUp/>;
        toggleMessage = 'I already have an account';
    }

    const toggleSigninSignup = () => {
        toggleHasAccount(!hasAccount);
    }

    return (   
    <div className='home' >
        {
            !user 
            ? <div>{signinOrSignUp}</div> 
            : <AppPage/>
        }
        {
            !user 
            ? <div><button className='button' type='button' onClick={toggleSigninSignup}>{toggleMessage}</button></div> 
            : null
        }
        
        <button className='button' type='button' onClick={handleSignout}>Sign Out</button>
        <button className='button' type='button' onClick={isLoggedIn}>Consolelog LoggedIn User</button>
        <button className='button' type='button' onClick={getLists}>Get Enrolled Lists</button>
    </div>
    )
};

export default HomePage;