import {
  ADD_LOCATION,
  INIT_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION
} from './locationsReducer';

export const initLocation = (locations) => ({
  type: INIT_LOCATION,
  payload: { locations }
});

export const addLocation = (location) => ({
  type: ADD_LOCATION,
  payload: { locationLabel: location.locationLabel, locationKey: location.locationKey }
});

export const deleteLocation = (location) => ({
  type: DELETE_LOCATION,
  payload: { locationKey: location.locationKey }
});

export const updateLocation = (location) => ({
  type: UPDATE_LOCATION,
  payload: { locationKey: location.locationKey, newLocationLabel: location.label }
});