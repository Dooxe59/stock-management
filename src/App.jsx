import React , { 
  useCallback, 
  useContext,
  useEffect,
} from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/home/Home";
import Administration from "./pages/administration/Administration";
import Login from "./pages/login/Login";
import { initLocation } from './store/locations/locationsActions';
import { initCategory } from "./store/categories/categoriesActions";
import { initProduct } from "./store/products/productsActions";
import LocationService from "./services/location";
import CategoryService from "./services/category";
import ProductService from "./services/product";
import ApplicationTopBar from "./components/applicationTopBar/ApplicationTopBar";
import { AuthContext } from "./components/authProvider/AuthProvider";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

import "./app.scss";


const App = () => {
  const dispatch = useDispatch();
  
  const initStoreLocations = useCallback((locations) => {
    dispatch(initLocation(locations));
  }, [dispatch]);

  const initStoreCategories = useCallback((categories) => {
    dispatch(initCategory(categories));
  }, [dispatch]);
  
  const initStoreProducts = useCallback((products) => {
    dispatch(initProduct(products));
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
        // TODO: error management + loading
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
        // TODO: error management + loading
        console.error(error.message);
      });

    ProductService.getAll().once("value")
    .then(products => {
      const dbProducts = [];
      products.forEach((product) => {
        let key = product.key;
        let data = product.val();
        dbProducts.push({
          // TODO: productKey: key,
          id: product.id,
          categoryKey: data.categoryKey,
          creationDate: data.creationDate,
          expirationDate: data.expirationDate,
          locationKey: data.locationKey,
          productName: data.productName,
          quantity: data.quantity,
        });
      });
      initStoreProducts(dbProducts);
    })
    .catch(error => {
      // TODO: error management + loading
      console.error(error.message);
    });
  });

  const {currentUser} = useContext(AuthContext);
  const renderAppBar = () => {
    return currentUser ? <ApplicationTopBar></ApplicationTopBar> : null;
  }

  return (
    <div className="app">
      <Router>
        {renderAppBar()}
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute exact path="/administration" component={Administration}></PrivateRoute>
        <Route exact path="/login" component={Login}/>
      </Router>
    </div>
  );
};

export default App;
