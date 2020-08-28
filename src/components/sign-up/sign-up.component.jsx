import React, {useState} from 'react';
import { useDispatch } from "react-redux"
import {setUser, setGlobalError} from '../../redux/user/user.slice';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
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

const SignUp = () => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const [userCredentials, setCredentials] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
    });

    const {email, displayName, password, confirmPassword} = userCredentials;

    const handleChange = event => {
        const {name, value} = event.target;

        setCredentials({...userCredentials, [name]: value});
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password, displayName, confirmPassword} = userCredentials;
        if(password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            const userRef= await createUserProfileDocument(user, {displayName});
            const userSnapshot = await userRef.get();
            const newUser = {id: userSnapshot.id, ...userSnapshot.data()};
            delete newUser.createdAt;
            dispatch(setUser(newUser));
        } catch(error) {
            dispatch(setGlobalError(error));
        }
    };


    return (
        <div className='sign-up'>
                <Grid container>
        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={10} md={8}>
          <form onSubmit={handleSubmit}>
          <h2 className={styles.titleStyles}>I do not have a account</h2>
          <span>Sign up with your email and password</span>
            <TextField
              className={styles.inputStyles}
              id="outlined-basic" 
              variant="outlined"
              size='small'
              type='text'
              name='displayName'
              value={displayName}
              onChange={handleChange}
              label='Display Name'
              required
            />
            <TextField
              className={styles.inputStyles}
              id="outlined-basic" 
              variant="outlined"
              size='small'
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              label='Email'
              required
            />
            <TextField
              className={styles.inputStyles}
              id="outlined-basic" 
              variant="outlined"
              size='small'
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              label='Password'
              required
            />
            <TextField
              className={styles.inputStyles}
              id="outlined-basic" 
              variant="outlined"
              size='small'
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              label='Confirm Password'
              required
            />
            <Button className={styles.buttonStyles} variant="contained" color="primary" size="large" type='submit'>
                    Sign Up
                </Button>
          </form>
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
        </div>
      );
}

export default SignUp;