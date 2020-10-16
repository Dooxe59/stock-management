import React from 'react';
import LocationManagement from '../../components/locationManagement/LocationManagement';

import "./administration.scss";

const Administration = () => {
  return (
    <div className="adminsitration-page">
      <h1>Administration</h1>
      <LocationManagement></LocationManagement>
    </div>
  );
};

export default Administration;