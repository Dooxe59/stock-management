import React from 'react';
import { useSelector } from 'react-redux';

import { Divider } from 'primereact/divider';

import AddLocationForm from './addLocationForm/AddLocationForm';

import LocationList from './locationList/LocationList';
import { locationsSelector } from 'store/locations/locationsSelector';

import './locationManagement.scss';

const LocationManagement = () => {
  const locations = useSelector(locationsSelector);

  return (
    <div className="location-management">
      <AddLocationForm />
      <Divider align="center">
        <span className="p-tag">Emplacements</span>
      </Divider>
      <LocationList locations={locations}></LocationList>
    </div>
  );
};

export default LocationManagement;