const initialState = {
  markers: [],
  currentListing: {},
  hover: {},
  listingHover: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'GET_MARKERS':
      return {...state, markers: action.markers}
    case 'GET_LISTING':
      return {...state, currentListing: action.establishment}
    case 'ACTIVE_HOVER':
      return {...state, hover: action.hover}
    case 'ACTIVE_LISTING':
      return {...state, listingHover: action.listingHover}
    default:
      return state
  }
}

