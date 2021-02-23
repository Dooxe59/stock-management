const initialState = [];

export const ADD_LOCATION = 'ADD_LOCATION';
export const INIT_LOCATION = 'INIT_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const locationsReducer = (state = initialState, action) => {
  switch(action.type) {
  case ADD_LOCATION: {
    if (!action.payload.locationLabel || !action.payload.locationKey) return state;

    const newItem = {
      locationKey: action.payload.locationKey,
      label: action.payload.locationLabel,
    };
    return [...state, newItem];
  }
  case INIT_LOCATION: {
    if(!action.payload.locations) return;
    return action.payload.locations;
  }
  case UPDATE_LOCATION: {
    if (!action.payload.newLocationLabel || !action.payload.locationKey) return state;

    const locationIndex = state.findIndex(item => item.locationKey === action.payload.locationKey);
    if (locationIndex === -1) return state;

    const locationListTemp = [...state];
    locationListTemp[locationIndex].label = action.payload.newLocationLabel;
    return locationListTemp;
  }
  default:
    return state;
  }
};