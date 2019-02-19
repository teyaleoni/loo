const initialState = {
  markers: [],
  listing: {
    details: {}
  },
  currentListing: {
    photos: [{}],
    opening_hours: {
      weekday_text: []
    }
  },
  hover: {},
  listingHover: {},
  comments: []
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
    case 'GET_LISTING_FOR_LISTINGS':
      const update = {}
      update[action.establishment.place_id] = action.establishment.formatted_address

      const newDetails = {...state.listing.details, ...update};
      return {...state, listing: {details: newDetails}}
    case 'GET_COMMENTS':
      return {...state, comments: action.comments}      
    default:
      return state
  }
}

