import React from 'react';
import { useSelector } from 'react-redux';

import AddLocationForm from './addLocationForm/AddLocationForm';

import LocationList from './locationList/LocationList';
import { locationsSelector } from 'store/locations/locationsSelector';

const LocationManagement = () => {
  const locations = useSelector(locationsSelector);

  return (
    <>
      <AddLocationForm />
      <LocationList locations={locations}></LocationList>
    </>
  );
};

export default LocationManagement;