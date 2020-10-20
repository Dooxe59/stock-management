import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import store from './store/index.js';
import Home from "./pages/home/Home";
import Administration from "./pages/administration/Administration";
import { Provider } from "react-redux";
import { Button, IconButton } from "@chakra-ui/core";
import { SettingsIcon } from "@chakra-ui/icons";

import "./app.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <div className="application-top-bar">
            <Link to="/">
              <Button size="sm" colorScheme="teal" variant="ghost">
                Gestion des stocks
              </Button>
            </Link>
            <div className="empty-area"></div>
            <Link to="/administration">
              <Button className="administration-button-text" size="xs" colorScheme="teal" variant="ghost">
                Administration
              </Button>
              <IconButton 
                className="administration-button-icon"
                title="Administration"
                variant="ghost"
                icon={<SettingsIcon />} 
                size="xs" 
                colorScheme="teal"/>
            </Link>
          </div>
          <Switch>
            <Route path="/administration">
              <Administration />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
