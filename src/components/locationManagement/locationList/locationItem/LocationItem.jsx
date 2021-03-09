import React from 'react';
import PropTypes from 'prop-types';
import { EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Text } from '@chakra-ui/core';

import './locationItem.scss';

const LocationItem = ( {location, updateLocation} ) => {
  return (
    <div className="location-item">
      <Text fontSize={['xs', 'sm']} className="location-label">
        {location.label}
      </Text>
      <Button 
        className="update-location-item-button-text"
        variant="outline"
        size="xs"
        colorScheme="blue"
        onClick={() => updateLocation()}>
        Modifier
      </Button>
      <IconButton 
        className="update-location-item-button-icon"
        variant="outline"
        title="Modifier"
        icon={<EditIcon />} 
        size="xs" 
        colorScheme="blue"
        onClick={() => updateLocation()}/>
    </div>
  );
};

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  updateLocation: PropTypes.func.isRequired,
};

export default LocationItem;