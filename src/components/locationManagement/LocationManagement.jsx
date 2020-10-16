import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { locationsSelector } from '../../store/location/locationsSelector';
import { addLocation } from '../../store/location/locationsActions';
import Button from '../ui/button/Buttons';

const LocationManagement = () => {
  const locations = useSelector(locationsSelector);
  const dispatch = useDispatch();
  const addNewLocation = useCallback((location) => {
    dispatch(addLocation(location));
  }, []);

  const [newLocationLabel, setNewLocationLabel] = useState("");
  const inputRef = useRef(null);

  const handleInputTextChange = (event) => {
    setNewLocationLabel(event.target.value);
  };

  const isValidNewLocationLabel = newLocationLabel?.trim()?.length > 0;

  const setFocusOnInput = () => {
    inputRef.current.focus();
  };

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
      setFocusOnInput();
    }
  };

  const clearInputText = () => {
    setNewLocationLabel("");
  };

  return (
    <div className="location-management">
      <div className="add-location-form">
        <span>
          Ajouter un emplacement:
        </span>
        <label className="add-location-input-label">
          <input
            autoFocus
            className="add-location-input"
            name="newLocationLabel"
            type="text"
            autoComplete="off"
            placeholder=" "
            ref={inputRef}
            value={newLocationLabel}
            onChange={handleInputTextChange}
            onKeyDown={handleKeyDown}
          />
        </label>
        <Button
          theme="green"
          label="Ajouter l'emplacement'"
          isDisabled={!isValidNewLocationLabel}
          onClick={validateAndAddNewLocation}
        ></Button>
      </div>
      <div className="location-list">
        <span className="location-list-section-label">
          Liste des emplacements:
        </span>
        { JSON.stringify(locations)}
      </div>
    </div>
  );
};

export default LocationManagement;