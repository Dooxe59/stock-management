import React, { 
  useCallback,
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation } from '../../store/locations/locationsActions';
import LocationList from './locationList/LocationList';
import { Button, IconButton, Input, useToast } from "@chakra-ui/core";
import { AddIcon } from '@chakra-ui/icons';
import LocationService from "../../services/location";
import { locationsSelector } from '../../store/locations/locationsSelector';

import "./locationManagement.scss";

const LocationManagement = () => {
  const dispatch = useDispatch();
  const addNewLocation = useCallback((location) => {
    dispatch(addLocation(location));
  }, [dispatch]);

  const locations = useSelector(locationsSelector);

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

  const locationManagementToast = useToast();

  const validateAndAddNewLocation = () => {
    if (isValidNewLocationLabel) {
      let locationLabel = newLocationLabel.trim();
      locationLabel = locationLabel.charAt(0).toUpperCase() + locationLabel.slice(1);

      let data = {
        label: locationLabel,
      };

      LocationService.create(data)
        .then((response) => {
          addNewLocation({locationLabel: locationLabel, locationKey: response.key});
          locationManagementToast({
            title: "Emplacement ajouté",
            description: `${locationLabel} a bien été ajouté.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          clearInputText();
        })
        .catch((e) => {
          // TODO: manage loading
          locationManagementToast({
            title: "Echec de l'ajout de l'emplacement",
            description: `${locationLabel} n'a pas été ajouté. Veuillez réessayer.`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log(e);
        });
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
      <LocationList locations={locations}></LocationList>
    </div>
  );
};

export default LocationManagement;