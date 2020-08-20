import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import {setUser, setGlobalError} from '../../redux/user/user.slice';
import { useDispatch } from "react-redux"


const SignIn = () => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

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
                <FormInput
                name='email'
                type='email'
                handleChange={handleChange}
                value={email}
                label='email'
                required
                />
                <FormInput
                name='password'
                type='password'
                value={password}
                handleChange={handleChange}
                label='password'
                required
                />
                <button className='button'>Sign In</button>
            </form>
        </div>
        
    );
};


export default SignIn;