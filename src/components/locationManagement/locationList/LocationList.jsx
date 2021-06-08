import React from 'react';
import PropTypes from 'prop-types';
import LocationItem from './locationItem/LocationItem';
import Uid from 'utils/uid';

import './locationList.scss';

const LocationList = ({locations}) => {
  const renderLocations = () => {
    return locations.map((location) => {
      return (
        <div className="location-item-container" key={Uid.generate()}>
          <LocationItem location={location} />
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