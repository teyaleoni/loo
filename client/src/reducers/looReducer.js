const initialState = {
  markers: [],
  currentListing: {
    photos: [{}],
    opening_hours: {
      weekday_text: []
    }
  },
  hover: {},
  listingHover: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'GET_MARKERS':
      return {...state, markers: action.markers}
    case 'GET_LISTING':
      action.establishment.opening_hours = action.establishment.opening_hours || {};
      const weekdays = action.establishment.opening_hours.weekday_text
      if (weekdays && Array.isArray(weekdays )) {
        action.establishment.opening_hours.weekday_text = weekdays.join('\n');
      }
      return {...state, currentListing: action.establishment}
    case 'ACTIVE_HOVER':
      return {...state, hover: action.hover}
    case 'ACTIVE_LISTING':
      return {...state, listingHover: action.listingHover}
    default:
      return state
  }
}

