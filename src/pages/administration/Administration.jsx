import React from 'react';
import LocationManagement from '../../components/locationManagement/LocationManagement';
import "./administration.scss";

const Administration = () => {
  return (
    <div className="administration-page">
      <div className="location-management">
        <LocationManagement></LocationManagement>
      </div>
      <div className="category-management">
        WIP
      </div>
    </div>
  );
};

export default Administration;