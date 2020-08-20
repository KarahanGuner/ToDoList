import React, {useState} from 'react';
import { useDispatch } from "react-redux"
import FormInput from '../form-input/form-input.component';
import {setUser, setGlobalError} from '../../redux/user/user.slice';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


import './sign-up.styles.scss';

const SignUp = () => {
    const dispatch = useDispatch();

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
          <h2 className='title'>I do not have a account</h2>
          <span>Sign up with your email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              onChange={handleChange}
              label='Display Name'
              required
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              label='Email'
              required
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              label='Password'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              label='Confirm Password'
              required
            />
            <button className='button' type='submit'>Sign Up</button>
          </form>
        </div>
      );
}

export default SignUp;