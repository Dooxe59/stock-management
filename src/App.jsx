import React , { 
  useCallback, 
  useEffect,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/home/Home";
import Administration from "./pages/administration/Administration";
import { useDispatch } from "react-redux";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/core";
import { BellIcon, QuestionIcon, SettingsIcon } from "@chakra-ui/icons";
import { initLocation } from './store/locations/locationsActions';
import LocationService from "./services/location";
import CategoryService from "./services/category";

import "./app.scss";
import { initCategory } from "./store/categories/categoriesActions";

const App = () => {
  const dispatch = useDispatch();
  
  const initStoreLocations = useCallback((locations) => {
    dispatch(initLocation(locations));
  }, [dispatch]);

  const initStoreCategories = useCallback((categories) => {
    dispatch(initCategory(categories));
  }, [dispatch]);
  
  useEffect(() => {
    LocationService.getAll().once("value")
      .then(locations => {
        const dbLocations = [];
        locations.forEach((item) => {
          let key = item.key;
          let data = item.val();
          dbLocations.push({
            locationKey: key,
            label: data.label,
          });
        });
        initStoreLocations(dbLocations);
      })
      .catch(error => {
        // TODO: error management
        console.error(error.message);
      });

    CategoryService.getAll().once("value")
      .then(categories => {
        const dbCategories = [];
        categories.forEach((item) => {
          let key = item.key;
          let data = item.val();
          dbCategories.push({
            categoryKey: key,
            label: data.label,
          });
        });
        initStoreCategories(dbCategories);
      })
      .catch(error => {
        // TODO: error management
        console.error(error.message);
      });
  });

  return (
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
            <Button 
              className="administration-button-text" 
              variant="outline"
              size="xs" 
              colorScheme="teal">
              Administration
            </Button>
            <IconButton 
              className="administration-button-icon"
              title="Administration"
              variant="outline"
              icon={<SettingsIcon />} 
              size="xs" 
              colorScheme="teal"/>
          </Link>
          <Popover>
            <PopoverTrigger>
              <IconButton 
                className="help-button-icon"
                title="Aide"
                variant="outline"
                icon={<QuestionIcon />} 
                size="xs" 
                colorScheme="teal"/>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Aide</PopoverHeader>
              <PopoverBody>
                <Text 
                  fontSize={["xs", "sm"]}
                  className="bell-icon-alert">
                  { <BellIcon/> }: Date passée ou aujourd'hui
                </Text>
                <Text 
                fontSize={["xs", "sm"]}
                className="bell-icon-warning">
                { <BellIcon/> }: Date proche (1 à 3 jours)
              </Text>
              <Text 
                fontSize={["xs", "sm"]}
                className="bell-icon">
                { <BellIcon /> }: Reste plus de 3 jours
              </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
  );
};

export default App;
