import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const {email, password} = userCredentials;

    const handleChange = event => {
        const {name, value} = event.target;

        setCredentials({...userCredentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

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