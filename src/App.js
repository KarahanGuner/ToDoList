import React from 'react';
import './App.css';
import {Paper} from '@material-ui/core';

import HomePage from './pages/homepage/homepage.component';

const App = () => {
  return (
    <Paper square>
      <div className='App'>
        <HomePage/>
      </div>
    </Paper>
    
  );
}

export default App;
