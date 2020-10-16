import { ADD_LOCATION, DELETE_LOCATION, UPDATE_LOCATION } from "./locationsReducer";

export const addLocation = (location) => ({
  type: ADD_LOCATION,
  payload: {locationLabel: location.locationLabel}
});

export const deleteLocation = (location) => ({
  type: DELETE_LOCATION,
  payload: {locationId: location.locationId}
});

export const updateLocation = (location) => ({
  type: UPDATE_LOCATION,
  payload: {locationId: location.locationId, newLocationLabel: location.newLocationLabel}
});