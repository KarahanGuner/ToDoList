import React from 'react';
import './App.css';
import {Paper} from '@material-ui/core';

import HomePage from './pages/homepage/homepage.component';
import CustomLogging from './CustomLogging';

const custom = new CustomLogging();
custom.log('Hello there!');
custom.log('This website has been created by Karahan Guner as a portfolio project.');
custom.log('If you have any suggestions or if you would like to hire me you can contact me at: kkarahanguner@gmail.com');

const App = () => {
  return (
    <Paper square elevation={0}>
      <div className='App'>
        <HomePage/>
      </div>
    </Paper>
    
  );
}

export default App;
