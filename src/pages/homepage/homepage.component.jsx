import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './homepage.styles.scss';

const HomePage = () => (
    
    <div className='home'>THIS IS THE HOMEPAGE
        <SignIn/>
        <SignUp/>
    </div>
);

export default HomePage;