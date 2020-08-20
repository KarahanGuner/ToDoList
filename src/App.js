import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import {Paper} from '@material-ui/core';

import HomePage from './pages/homepage/homepage.component';

const App = () => {
  return (
    <Paper square>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch>
      </div>
    </Paper>
    
  );
}

export default App;
