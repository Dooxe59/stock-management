import React , { 
  useCallback, 
  useContext,
  useEffect,
} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/home/Home';
import Administration from './pages/administration/Administration';
import Login from './pages/login/Login';  
import { initLocation } from './store/locations/locationsActions';
import { initCategory } from './store/categories/categoriesActions';
import { initProduct } from './store/products/productsActions';
import LocationService from './services/location';
import CategoryService from './services/category';
import ProductService from './services/product';
import ApplicationTopBar from './components/applicationTopBar/ApplicationTopBar';
import { AuthContext } from './providers/AuthProvider';
import PrivateRoute from './components/privateRoute/PrivateRoute';

import './app.scss';
import { ToastContext } from './providers/ToastProvider';


const App = () => {
  const dispatch = useDispatch();
  
  const initStoreLocations = useCallback((locations) => {
    dispatch(initLocation(locations));
  }, [dispatch]) ;     

  const initStoreCategories = useCallback((categories) => {
    dispatch(initCategory(categories));
  }, [dispatch]);
  
  const initStoreProducts = useCallback((products) => {
    dispatch(initProduct(products));
  }, [dispatch]);

  const {toast} = useContext(ToastContext);

  const loadLocations = () => {
    LocationService.getAll().once('value')
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
        // TODO: manage loading
        toast({
          title: 'Echec du chargement des emplacements',
          description: `${error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const loadCategories = () => {
    CategoryService.getAll().once('value')
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
        // TODO: manage loading
        toast({
          title: 'Echec du chargement des catégories',
          description: `${error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const loadProducts = () => {
    ProductService.getAll().once('value')
      .then(products => {
        const dbProducts = [];
        products.forEach((product) => {
          let key = product.key;
          let data = product.val();
          dbProducts.push({
            productKey: key,
            categoryKey: data.categoryKey,
            expirationDate: data.expirationDate,
            locationKey: data.locationKey,
            productName: data.productName,
            quantity: data.quantity,
          });
        });
        initStoreProducts(dbProducts);
      })
      .catch(error => {
        // TODO: manage loading
        toast({
          title: 'Echec du chargement des produits',
          description: `${error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    if(currentUser) {
      loadLocations();
      loadCategories();
      loadProducts();
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const renderAppBar = () => {
    return currentUser ? <ApplicationTopBar></ApplicationTopBar> : null;
  };

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
