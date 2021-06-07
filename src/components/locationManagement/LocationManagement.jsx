import React, { 
  useCallback,
  useContext,
  useState 
} from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

import { useDispatch, useSelector } from 'react-redux';
import { addLocation } from 'store/locations/locationsActions';
import LocationList from './locationList/LocationList';
import LocationService from 'services/location';
import { locationsSelector } from 'store/locations/locationsSelector';
import { ToastContext } from 'providers/ToastProvider';

import './locationManagement.scss';

const LocationManagement = () => {
  const dispatch = useDispatch();
  const addNewLocation = useCallback((location) => {
    dispatch(addLocation(location));
  }, [dispatch]);

  const locations = useSelector(locationsSelector);

  const [newLocationLabel, setNewLocationLabel] = useState('');
  const [addLocationState, setAddLocationState] = useState('');

  const handleInputTextChange = (event) => {
    setNewLocationLabel(event.target.value);
  };

  const isValidNewLocationLabel = newLocationLabel?.trim()?.length > 0;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      validateAndAddNewLocation();
      event.preventDefault();
    }
  };

  const {toast} = useContext(ToastContext);

  const validateAndAddNewLocation = () => {
    if (isValidNewLocationLabel) {
      let locationLabel = newLocationLabel.trim();
      locationLabel = locationLabel.charAt(0).toUpperCase() + locationLabel.slice(1);

      let data = {
        label: locationLabel,
      };

      setAddLocationState('LOADING');
      LocationService.create(data)
        .then((response) => {
          addNewLocation({locationLabel: locationLabel, locationKey: response.key});
          toast({
            title: 'Emplacement ajouté',
            description: `${locationLabel} a bien été ajouté.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          clearInputText();
          setAddLocationState('SUCCESS');
        })
        .catch((e) => {
          setAddLocationState('ERROR');
          toast({
            title: 'Echec de l\'ajout de l\'emplacement',
            description: `${locationLabel} n'a pas été ajouté. Veuillez réessayer.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const isLoadingAddLocationState = addLocationState === "LOADING";
  const isDisabledAddNewLocationButton = !isValidNewLocationLabel || isLoadingAddLocationState;

  const clearInputText = () => {
    setNewLocationLabel('');
  };

  return (
    <div className="location-management">
      <div className="add-location-form">
        <div className="p-float-label p-input-icon-right location-form">
          { isLoadingAddLocationState && <i className="pi pi-spin pi-spinner" /> }
          <InputText 
            id="newLocationInput" 
            value={newLocationLabel} 
            onChange={handleInputTextChange}
            placeholder="Ajouter un emplacement" 
            className="p-inputtext-sm location-input-text"
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button 
          label="Ajouter" 
          className="p-button-sm p-button-outlined add-location-button" 
          disabled={isDisabledAddNewLocationButton}
          onClick={() => validateAndAddNewLocation()}/>
      </div>
      <Divider />
      <LocationList locations={locations}></LocationList>
    </div>
  );
};

export default LocationManagement;