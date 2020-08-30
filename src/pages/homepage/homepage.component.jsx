import React, {useState} from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import AppPage from '../apppage/apppage.component';
import Button from '@material-ui/core/Button';

//import './homepage.styles.scss';

import { useSelector, useDispatch } from "react-redux"
import {setUser} from '../../redux/user/user.slice';

import { auth } from '../../firebase/firebase.utils';

//material-ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toggleSignInSignUp: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '13px'   
    }
}));

const HomePage = () => {
    const [hasAccount, toggleHasAccount] = useState(true);
    const styles = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    console.log('====user in homepage component=====');
    console.log(user);
    const handleSignout = async () => {
        await auth.signOut();
        dispatch(setUser(null));
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
        <Grid container>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8} >
            {
                !user 
                ? <div>{signinOrSignUp}</div> 
                : <AppPage/>
            }
            {
                !user 
                ? <div className={styles.toggleSignInSignUp}><Button onClick={toggleSigninSignup} size='small' variant="outlined">{toggleMessage}</Button></div> 
                : null
            }
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
        </Grid>

        {/* <button className='button' type='button' onClick={handleSignout}>Sign Out</button> */}

    </div>
    )
};

export default HomePage;