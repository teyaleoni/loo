const initialState = {
  markers: [],
  currentListing: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'GET_MARKERS':
      return {...state, markers: action.markers}
    case 'GET_LISTING':
      return {...state, currentListing: action.establishment}
    default:
      return state
  }
}

