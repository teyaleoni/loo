const initialState = {
  markers: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'GET_MARKERS':
      return {...state, markers: action.markers}
    default:
      return state
  }
}