import axios from 'axios'
import store from '../store'


axios.defaults.baseURL = '/api'

export function getGoogleMarkers() {
  axios.get('/listings').then(resp => {
    store.dispatch({
      type: 'GET_MARKERS', 
      markers: resp.data
    })
  })
}