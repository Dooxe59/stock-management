import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel, Select } from '@chakra-ui/react';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import { useSelector } from 'react-redux';

const LocationSelectorInput = ({productLocation, handleInputProductLocationChange, addEmptySelect, inputSize = 'sm'}) => {
  const locations = useSelector(locationsSelector);
  const renderSelectLocationOptions = () => {
    return locations.map((location, index) => {
      return <option value={location.locationKey} key={index}>{location.label}</option>;
    });
  };

  return (
    <div className="location-selector-input">
      <FormLabel fontSize={['sm', 'md']} htmlFor="productLocation">
        Emplacement
      </FormLabel>
      <Select size={inputSize} value={productLocation} onChange={handleInputProductLocationChange}>
        {addEmptySelect ? <option value=""></option> : ''}
        {renderSelectLocationOptions()}
      </Select>
    </div>
  );
};

LocationSelectorInput.propTypes = {
  productLocation: PropTypes.string.isRequired,
  handleInputProductLocationChange: PropTypes.func.isRequired,
  addEmptySelect: PropTypes.bool,
  inputSize: PropTypes.string,
};

export default LocationSelectorInput;