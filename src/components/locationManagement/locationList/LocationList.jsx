import React, { 
  useCallback,
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import { updateLocation } from '../../../store/locations/locationsActions';
import LocationItem from './locationItem/LocationItem';
import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";

import "./locationList.scss";

const LocationList = () => {
  const locations = useSelector(locationsSelector);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedLocation, setUpdatedLocation] = useState({});

  const isValidUpdatedLocation = updatedLocation?.label?.trim().length > 0;

  const openUpdateLocationModal = (locationId) => {
    const location = locations.find(location => location.id === locationId);
    setUpdatedLocation(location);
    onOpen();
  };

  
  const dispatch = useDispatch();
  const updateLocationStore = useCallback((location) => {
    dispatch(updateLocation(location));
  }, []);

  const updateLocationFromModal = () => {
    updateLocationStore(updatedLocation);
    onClose();
  };

  const renderLocations = () => {
    return locations.map(location => {
      return <LocationItem location={location} key={location.id} updateLocation={() => openUpdateLocationModal(location.id)}></LocationItem>;
    })
  };


  const handleInputTextChange = (event) => {
    setUpdatedLocation({
      label: event.target.value,
      id: updatedLocation.id,
    });
  };

  return (
    <div className="location-list">
      <span className="location-list-section-label">
        Emplacements:
      </span>
      { renderLocations() }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Mise à jour d'un emplacement</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Input 
              size="sm" 
              aria-label="Nom de l'emplacement"
              placeholder="Nom de l'emplacement" 
              value={updatedLocation.label}
              onChange={handleInputTextChange}/>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing="6">
                <Button colorScheme="blue" isDisabled={!isValidUpdatedLocation} onClick={() => updateLocationFromModal()}>
                  Mettre à jour
                </Button>
                <Button variant="ghost" onClick={onClose}>Annuler</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default LocationList;