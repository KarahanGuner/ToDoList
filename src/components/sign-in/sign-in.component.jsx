import React, {useState} from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import {setUser, setGlobalError} from '../../redux/user/user.slice';
import { useDispatch } from "react-redux"
//material ui
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    inputStyles: {
        width: '100%',
        borderRadius: 0,
        marginTop: '10px',
        marginBottom: '5px'
         
    },
    buttonStyles: {
        width: '35%',
        marginTop: '10px',
    },
    titleStyles: {
        marginTop: '10px',
        marginBottom: '10px'
    }
}));

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const styles = useStyles();
    const {email, password} = userCredentials;

    const handleChange = event => {
        const {name, value} = event.target;

        setCredentials({...userCredentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        
        const {user} = await auth.signInWithEmailAndPassword(email, password);
        try {
            const userRef= await createUserProfileDocument(user);
            const userSnapshot = await userRef.get();
            const loggedInUser = {id: userSnapshot.id, ...userSnapshot.data()};
            delete loggedInUser.createdAt;
            dispatch(setUser(loggedInUser));
        } catch(error) {
            dispatch(setGlobalError(error));
        }
    };


    return (
        <div className='sign-in'>
            <Grid container>
            <Grid item xs={1} ></Grid>
            <Grid item xs={10}>
            <form onSubmit={handleSubmit} >
                <h2 className={styles.titleStyles}>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <TextField
                className={styles.inputStyles}
                id="outlined-basic" 
                variant="outlined"
                size='small'
                name='email'
                type='email'
                onChange={handleChange}
                value={email}
                label='email'
                required
                />
                <TextField
                className={styles.inputStyles}
                id="outlined-basic" 
                variant="outlined"
                size='small'
                name='password'
                type='password'
                value={password}
                onChange={handleChange}
                label='password'
                required
                />
                <Button className={styles.buttonStyles} variant="contained" color="primary" size="large" type='submit'>
                    Sign In
                </Button>
                
            </form>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>
        </div>
        
    );
};


export default SignIn;