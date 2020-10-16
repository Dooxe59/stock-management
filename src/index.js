import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from "@chakra-ui/core";

import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
