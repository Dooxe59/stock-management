import React, {
  useCallback,
  useContext,
  useRef,
  useState
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Menu } from 'primereact/menu';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import LocationService from 'services/location';
import { ToastContext } from 'providers/ToastProvider';
import { deleteLocation, updateLocation } from 'store/locations/locationsActions';
import Uid from 'utils/uid';
import { State } from 'utils/enums';

import './locationList.scss';

const LocationList = ({ locations }) => {
  const cm = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showUpdateLocationSidebar, setShowUpdateLocationSidebar] = useState(false);
  const [updateLocationState, setUpdateLocationState] = useState("");
  const dispatch = useDispatch();

  const updateLocationStore = useCallback((location) => {
    dispatch(updateLocation(location));
  }, [dispatch]);

  const deleteLocationStore = useCallback((location) => {
    dispatch(deleteLocation(location));
  }, [dispatch]);

  const items = [
    {
      label: 'Modifier',
      icon: 'pi pi-fw pi-pencil',
      command: () => { setShowUpdateLocationSidebar(true) }
    },
    {
      label: 'Supprimer',
      icon: 'pi pi-fw pi-trash',
      command: () => { deleteSelectedLocation() }
    }
  ];

  const openContextualMenu = (e, location) => {
    cm.current.show(e);
    setSelectedLocation(location);
  };

  const { toast } = useContext(ToastContext);

  const deleteSelectedLocation = () => {
    const locationName = { ...selectedLocation }.label;
    LocationService.delete(selectedLocation.locationKey)
      .then(() => {
        deleteLocationStore({ locationKey: selectedLocation.locationKey });
        toast({
          title: 'Emplacement supprimé',
          description: `${locationName} a bien été supprimée.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setSelectedLocation(null);
      })
      .catch((e) => {
        // TODO: manage loading
        toast({
          title: 'Echec de la suppression de l\'emplacement',
          description: `${locationName} n'a pas été supprimé. Veuillez réessayer.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.error(e);
      });
  }

  const updateExistingLocation = () => {
    if (!isValidLocation) return;
    const data = {
      label: selectedLocation.label,
    };
    setUpdateLocationState(State.LOADING);
    LocationService.update(selectedLocation.locationKey, data)
      .then(() => {
        updateLocationStore(selectedLocation);
        setShowUpdateLocationSidebar(false)
        toast({
          title: 'Emplacement mis à jour',
          description: `${selectedLocation.label} a bien été mis à jour.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setUpdateLocationState(State.SUCCESS);
      })
      .catch((e) => {
        toast({
          title: 'Echec de la mise à jour de l\'emplacement',
          description: `${selectedLocation.label} n'a pas été mis à jour. Veuillez réessayer.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(e);
        setUpdateLocationState(State.ERROR);
      });
  };

  const renderLocationItem = (location) => {
    return (
      <>
        <span aria-haspopup>{location.label}</span>
        <Button
          icon="pi pi-bars"
          className="p-button-rounded p-button-text"
          onClick={(event) => openContextualMenu(event, location)}
          aria-controls="popup_menu"
          aria-haspopup />
      </>
    );
  };

  const renderLocations = () => {
    return locations.map((location) => {
      return (
        <div className="location-item-container" key={Uid.generate()}>
          <Menu model={items} popup ref={cm} id="popup_menu" />
          <Chip template={renderLocationItem(location)} className="p-mr-2 p-mb-2 default-tag" />
        </div>);
    });
  };

  const handleInputTextChange = (event) => {
    setSelectedLocation({
      label: event.target.value,
      locationKey: selectedLocation.locationKey,
    });
  };

  const isValidLocation = selectedLocation?.label?.trim().length > 0;
  const isLoadingUpdateLocationState = updateLocationState === State.LOADING;
  const updateLocationButtonLabel = isLoadingUpdateLocationState ? "" : "Modifier"

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      updateExistingLocation();
      event.preventDefault();
    }
  };

  return (
    <div className="location-list">
      {renderLocations()}
      <Sidebar
        visible={showUpdateLocationSidebar}
        position="bottom"
        onHide={() => setShowUpdateLocationSidebar(false)}>
        <span className="p-float-label">
          <InputText
            id="updateLocationInput"
            value={selectedLocation?.label}
            onChange={(e) => handleInputTextChange(e)}
            onKeyDown={handleKeyDown} />
          <label htmlFor="updateLocationInput">Nom de l'emplacement</label>
        </span>
        <div className="p-buttonset update-button">
          <Button
            label={updateLocationButtonLabel}
            icon="pi pi-check"
            disabled={!isValidLocation}
            loading={isLoadingUpdateLocationState}
            onClick={() => updateExistingLocation()} />
        </div>
      </Sidebar>
    </div>
  );
};

LocationList.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default LocationList;