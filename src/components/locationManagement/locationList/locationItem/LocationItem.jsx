import React from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { Button } from "@chakra-ui/core";

import "./locationItem.scss";

const LocationItem = ( {location, updateLocation} ) => {
  return (
    <div className="location-item">
      <div className="location-label">
        {location.label}
      </div>
      <Button leftIcon={<EditIcon />} size="sm" colorScheme="blue" onClick={() => updateLocation()}>
        Modifier
      </Button>
    </div>
  );
};

export default LocationItem;