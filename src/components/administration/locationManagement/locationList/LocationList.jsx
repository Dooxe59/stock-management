import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'primereact/chip';
import Uid from 'utils/uid';

import './locationList.scss';

const LocationList = ({locations}) => {
  const renderLocations = () => {
    return locations.map((location) => {
      return (
        <div className="location-item-container" key={Uid.generate()}>
          <Chip label={location.label} />
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