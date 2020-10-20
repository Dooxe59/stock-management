import React, { 
  useCallback,
  useState 
} from 'react';
import { useDispatch } from 'react-redux';
import { addLocation } from '../../store/locations/locationsActions';
import LocationList from './locationList/LocationList';
import { Button, IconButton, Input } from "@chakra-ui/core";
import { AddIcon } from '@chakra-ui/icons';

import "./locationManagement.scss";

const LocationManagement = () => {
  const dispatch = useDispatch();
  const addNewLocation = useCallback((location) => {
    dispatch(addLocation(location));
  }, [dispatch]);

  const [newLocationLabel, setNewLocationLabel] = useState("");

  const handleInputTextChange = (event) => {
    setNewLocationLabel(event.target.value);
  };

  const isValidNewLocationLabel = newLocationLabel?.trim()?.length > 0;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      validateAndAddNewLocation();
      event.preventDefault();
    }
  };

  const validateAndAddNewLocation = () => {
    if (isValidNewLocationLabel) {
      let locationLabel = newLocationLabel.trim();
      locationLabel = locationLabel.charAt(0).toUpperCase() + locationLabel.slice(1);

      addNewLocation({locationLabel: locationLabel});
      clearInputText();
    }
  };

  const clearInputText = () => {
    setNewLocationLabel("");
  };

  return (
    <div className="location-management">
      <div className="add-location-form">
        <Input
          variant="filled"
          size="sm" 
          placeholder="Ajouter un emplacement" 
          value={newLocationLabel}
          onChange={handleInputTextChange}
          onKeyDown={handleKeyDown}/>
        <Button 
          className="add-location-button add-location-button-text"
          variant="outline"
          size="sm"
          colorScheme="green"
          isDisabled={!isValidNewLocationLabel}
          onClick={() => validateAndAddNewLocation()}>
          Ajouter
        </Button>
        <IconButton 
          className="add-location-button add-location-button-icon"
          variant="outline"
          title="Ajouter"
          icon={<AddIcon />} 
          size="sm" 
          colorScheme="green"
          isDisabled={!isValidNewLocationLabel}
          onClick={() => validateAndAddNewLocation()}/>
      </div>
      <hr/>
      <LocationList></LocationList>
    </div>
  );
};

export default LocationManagement;