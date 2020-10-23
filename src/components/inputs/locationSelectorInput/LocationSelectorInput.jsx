import React from 'react';
import { FormLabel, Select } from '@chakra-ui/core';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import { useSelector } from 'react-redux';

const LocationSelectorInput = ({productLocation, handleInputProductLocationChange, addEmptySelect}) => {
  const locations = useSelector(locationsSelector);
  const renderSelectLocationOptions = () => {
    return locations.map(location => {
      return <option value={location.id} key={location.id}>{location.label}</option>
    });
  };

  return (
    <div className="location-selector-input">
      <FormLabel fontSize={["sm", "md"]} htmlFor="productLocation">
        Emplacement
      </FormLabel>
      <Select value={productLocation} onChange={handleInputProductLocationChange}>
        {addEmptySelect ? <option value=""></option> : ""}
        {renderSelectLocationOptions()}
      </Select>
    </div>
  );
};

export default LocationSelectorInput;