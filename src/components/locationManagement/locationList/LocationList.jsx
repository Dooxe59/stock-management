import React from 'react';
import PropTypes from 'prop-types';
import LocationItem from './locationItem/LocationItem';

import './locationList.scss';

const LocationList = ({locations}) => {
  const renderLocations = () => {
    return locations.map((location, index) => {
      return (
        <div className="location-item-container">
          <LocationItem 
            location={location} 
            key={index}>
          </LocationItem>
        </div>);
    });
  };

  return (
    <div className="location-list">
      { renderLocations() }
    </div>
  );
};

LocationList.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default LocationList;