import axios from 'axios'
import store from '../store'

axios.defaults.baseURL = '/api'

export function activeHover(hover_id) {
  store.dispatch({
    type: 'ACTIVE_HOVER',
    hover: hover_id

  })
}

export function activeListing(listing_id) {
  store.dispatch({
    type: 'ACTIVE_LISTING',
    listingHover: listing_id
  })
}

export function getGoogleMarkers() {
  return axios.get('/listings').then(resp => {
    store.dispatch({
      type: 'GET_MARKERS', 
      markers: resp.data
    })
  })
}

export function getListingDetails(place_id) {
  axios.get('/listing/'+ place_id).then(resp => {
    store.dispatch({
      type: 'GET_LISTING_FOR_LISTINGS', 
      establishment: resp.data
    })
  })
}

export function getListing(place_id) {
  axios.get('/listing/'+ place_id).then(resp => {
    store.dispatch({
      type: 'GET_LISTING', 
      establishment: resp.data
    })
  })
}