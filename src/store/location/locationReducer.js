const initialState = [{
  label: "Frigo",
  id: 1,
},{
  label: "Congélateur RDC",
  id: 2,
},{
  label: "Congélateur sous-sol",
  id: 3,
}];

export const ADD_LOCATION = 'ADD_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const locationsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_LOCATION: {
      console.log(action);
      if (!action.payload.locationLabel) return state;

      const newItem = {
        label: action.payload.locationLabel,
        id: state.length + 1,
      };
      return [...state, newItem];
    }
    case DELETE_LOCATION: {
      const locationIndex = state.findIndex(item => item.id === action.payload.locationId);
      if (locationIndex === -1) return state;

      const locationListTemp = [...state];

      locationListTemp.splice(locationIndex, 1);
      return locationListTemp;
    }
    case UPDATE_LOCATION: {
      if (!action.payload.newLocationLabel) return state;

      const locationIndex = state.findIndex(item => item.id === action.payload.locationId);
      if (locationIndex === -1) return state;

      const locationListTemp = [...state];
      locationListTemp[locationIndex].label = action.payload.newLocationLabel;
      return locationListTemp;
    }
    default:
      return state;
  }
};