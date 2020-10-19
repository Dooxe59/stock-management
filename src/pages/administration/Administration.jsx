import React from 'react';
import CategoryManagement from '../../components/categoryManagement/CategoryManagement';
import LocationManagement from '../../components/locationManagement/LocationManagement';

import "./administration.scss";

const Administration = () => {
  return (
    <div className="administration-page">
      <div className="location-management">
        <LocationManagement></LocationManagement>
      </div>
      <hr className="administration-separator"/>
      <div className="category-management">
        <CategoryManagement></CategoryManagement>
      </div>
    </div>
  );
};

export default Administration;