import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/home/Home";
import Administration from "./pages/administration/Administration";
import {ToolOutlined} from '@ant-design/icons';
import { Provider } from "react-redux";
import store from './store/index.js';

import "./app.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
          <Router>
            <div className="application-top-bar">
              <Link to="/">
                <span className="application-name">Gestion des stocks</span>
              </Link>
              <div className="empty-area"></div>
              <Link to="/administration">
                <span className="administration-page-button-icon"><ToolOutlined /></span>
              </Link>
              <Link to="/administration">
                <span className="administration-page-button-label">Administration</span>
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
