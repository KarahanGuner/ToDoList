import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import FormInput from '../form-input/form-input.component';
import {signUp} from '../../redux/user/user.slice';

import './sign-up.styles.scss';

const SignUp = () => {
    const user = useSelector((state) => state.userReducer.user);
    console.log('====user in signup component=====');
    console.log(user);
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
        dispatch(signUp(userCredentials));
    };


    return (
        <div className='sign-up'>
          <h2 className='title'>I do not have a account</h2>
          <span>Sign up with your email and password</span>
          <form className='sign-up-form' onSubmit={handleSubmit}>
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