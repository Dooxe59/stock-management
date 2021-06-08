import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'primereact/chip';

import './locationItem.scss';

const LocationItem = ( {location} ) => {
  return (
    <Chip label={location.label} className="p-mr-2 p-mb-2 location-item" />
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LocationItem;