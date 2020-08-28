import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import {setUser, setGlobalError} from '../../redux/user/user.slice';
import { useDispatch } from "react-redux"
//material ui
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
            <form onSubmit={handleSubmit} >
                <h2 className='title'>I already have an account</h2>
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
        </div>
        
    );
};


export default SignIn;