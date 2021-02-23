import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from '@chakra-ui/core';
import store from './store/index.js';
import moment from 'moment';
import 'moment/locale/fr';
import { Provider } from 'react-redux';
import AuthProvider from './providers/AuthProvider';
import ToastProvider from './providers/ToastProvider';

import './index.scss';

moment.locale('fr');


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <ToastProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ToastProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
