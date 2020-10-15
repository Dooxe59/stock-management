import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { locationSelector } from '../../store/location/locationSelector';
import { addLocation } from '../../store/location/locationActions';

const LocationManagement = () => {
  const locations = useSelector(locationSelector);
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
      addNewLocation({locationLabel: newLocationLabel.trim()});
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
          <span>
            Ajouter un emplacement:
          </span>
        </label>

      </div>
      <div className="location-list">
        <span className="location-list-section-label">
          Aperçu des emplacements:
        </span>
        { JSON.stringify(locations)}
      </div>
    </div>
  );
};

export default LocationManagement;