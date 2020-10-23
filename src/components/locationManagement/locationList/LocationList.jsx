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
  Text,
  useDisclosure,
} from "@chakra-ui/core";

import "./locationList.scss";

const LocationList = () => {
  const locations = useSelector(locationsSelector);
  
  const { isOpen: isOpenUpdateLocationModal, onOpen: onOpenUpdateLocationModal, onClose: onCloseUpdateLocationModal } = useDisclosure();
  const [updatedLocation, setUpdatedLocation] = useState({});

  const isValidUpdatedLocation = updatedLocation?.label?.trim().length > 0;

  const openUpdateLocationModal = (locationId) => {
    const location = locations.find(location => location.id === locationId);
    setUpdatedLocation(location);
    onOpenUpdateLocationModal();
  };

  
  const dispatch = useDispatch();
  const updateLocationStore = useCallback((location) => {
    dispatch(updateLocation(location));
  }, [dispatch]);

  const updateLocationFromModal = () => {
    updateLocationStore(updatedLocation);
    onCloseUpdateLocationModal();
  };

  const renderLocations = () => {
    return locations.map(location => {
      return <LocationItem location={location} key={location.id} updateLocation={() => openUpdateLocationModal(location.id)}></LocationItem>;
    })
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isValidUpdatedLocation) {
      updateLocationFromModal();
      event.preventDefault();
    }
  };

  const handleInputTextChange = (event) => {
    setUpdatedLocation({
      label: event.target.value,
      id: updatedLocation.id,
    });
  };

  return (
    <div className="location-list">
      <Text fontSize={["sm", "md"]} className="location-list-section-label">
        Emplacements:
      </Text>
      { renderLocations() }
      <Modal isOpen={isOpenUpdateLocationModal} onClose={onCloseUpdateLocationModal}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize={["md", "lg"]}>Mise à jour d'un emplacement</ModalHeader>
            <ModalBody>
              <Input 
                size="sm" 
                aria-label="Nom de l'emplacement"
                placeholder="Nom de l'emplacement" 
                value={updatedLocation.label}
                onChange={handleInputTextChange}
                onKeyDown={handleKeyDown}/>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing="6">
                <Button 
                  fontSize={["sm", "md"]}
                  size="sm"
                  colorScheme="blue"
                  isDisabled={!isValidUpdatedLocation}
                  onClick={() => updateLocationFromModal()}>
                  Mettre à jour
                </Button>
                <Button 
                  fontSize={["sm", "md"]}
                  size="sm"
                  variant="ghost"
                  onClick={onCloseUpdateLocationModal}>
                  Annuler
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default LocationList;