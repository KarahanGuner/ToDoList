import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//react redux
import store from './redux/store';
import { Provider } from 'react-redux';
//redux-persist
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
//material ui
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

const persistor = persistStore(store);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: orange[500],
    },
    background: {
      paper: '#252525'
    }
  },

});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
