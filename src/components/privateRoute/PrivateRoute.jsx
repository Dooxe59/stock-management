import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
  const {currentUser} = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={routeProps => 
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;