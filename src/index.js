import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from "@chakra-ui/core";
import { registerLocale } from  "react-datepicker";

import fr from 'date-fns/locale/fr';

import moment from "moment";
import "moment/locale/fr";

registerLocale('fr', fr);
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
