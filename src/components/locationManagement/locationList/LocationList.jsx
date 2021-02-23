import React, { 
  useCallback,
  useContext,
  useState 
} from 'react';
import { useDispatch } from 'react-redux';
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
} from '@chakra-ui/core';
import LocationService from '../../../services/location';
import { ToastContext } from '../../../providers/ToastProvider';

import './locationList.scss';

const LocationList = ({locations}) => {
  const { 
    isOpen: isOpenUpdateLocationModal, 
    onOpen: onOpenUpdateLocationModal, 
    onClose: onCloseUpdateLocationModal 
  } = useDisclosure();
  const [updatedLocation, setUpdatedLocation] = useState({});

  const isValidUpdatedLocation = updatedLocation?.label?.trim().length > 0;

  const openUpdateLocationModal = (locationKey) => {
    const location = locations.find(location => location.locationKey === locationKey);
    setUpdatedLocation(location);
    onOpenUpdateLocationModal();
  };

  const dispatch = useDispatch();
  const updateLocationStore = useCallback((location) => {
    dispatch(updateLocation(location));
  }, [dispatch]);

  const {toast} = useContext(ToastContext);

  const updateLocationFromModal = () => {
    const data = {
      label: updatedLocation.label,
    };
    LocationService.update(updatedLocation.locationKey, data)
      .then(() => {
        updateLocationStore(updatedLocation);
        onCloseUpdateLocationModal();
        toast({
          title: 'Emplacement mis à jour',
          description: `${updatedLocation.label} a bien été mis à jour.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((e) => {
        // TODO: manage loading
        toast({
          title: 'Echec de la mise à jour de l\'emplacement',
          description: `${updatedLocation.label} n'a pas été mis à jour. Veuillez réessayer.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const renderLocations = () => {
    return locations.map((location, index) => {
      return (
        <LocationItem 
          location={location} 
          key={index} 
          updateLocation={() => openUpdateLocationModal(location.locationKey)}>
        </LocationItem>);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && isValidUpdatedLocation) {
      updateLocationFromModal();
      event.preventDefault();
    }
  };

  const handleInputTextChange = (event) => {
    setUpdatedLocation({
      label: event.target.value,
      locationKey: updatedLocation.locationKey,
    });
  };

  return (
    <div className="location-list">
      <Text fontSize={['sm', 'md']} className="location-list-section-label">
        Emplacements:
      </Text>
      { renderLocations() }
      <Modal isOpen={isOpenUpdateLocationModal} onClose={onCloseUpdateLocationModal}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize={['md', 'lg']}>Mise à jour d'un emplacement</ModalHeader>
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
                  fontSize={['sm', 'md']}
                  size="sm"
                  colorScheme="blue"
                  isDisabled={!isValidUpdatedLocation}
                  onClick={() => updateLocationFromModal()}>
                  Mettre à jour
                </Button>
                <Button 
                  fontSize={['sm', 'md']}
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