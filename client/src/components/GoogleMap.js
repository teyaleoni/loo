import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
/* import action */
import { getGoogleMarkers, activeHover } from '../actions/looActions'
import '../styles/googlemap.css'
import {geolocated} from 'react-geolocated'


class Marker extends Component {
  handleMouseOver = (e) => {
    // console.log(this.props.id) (checks if it works)
    activeHover(this.props.id)
    document.getElementById(this.props.id).scrollIntoView()
  }

  handleMouseOut = (e) => {
    activeHover({})
  }
  render() {
    return (
      <img
        className={this.props.className}
        src={this.props.image}
        height="40"
        width="37"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        alt={'marker'}
      />
    )
  }
}

class GoogleMap extends Component {
  state = {
    height: window.innerHeight - 110
  }
  currentLocation = null;

  /* action */
  componentDidMount() {
    window.addEventListener('resize', this.changeHeight)

    getGoogleMarkers()
    this.getCurrentLocation();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeHeight)
  }

  changeHeight = (e) => {
    this.setState({
      height: window.innerHeight - 110
    })
  }

  getCurrentLocation() {
    fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAmjIY1E4X_kqTBYDgngyXI5Q8npxmVSGU', {
      method: 'POST'
    }).then(r => r.json())
      .then(({ location }) => {
        this.currentLocation = location;
      })
      .catch(e => console.error(e))
  }

  static defaultProps = {
    center: {
      lat: 36.158522,
      lng: -115.152391
    },
    zoom: 14
  };


  render() {
    if (!this.currentLocation) {
      return (<div>Geolocation is loading...</div>);
    }

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.state.height, width: '65%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAmjIY1E4X_kqTBYDgngyXI5Q8npxmVSGU' }}
          defaultCenter={this.currentLocation}
          defaultZoom={this.props.zoom} >


          {this.props.markers.map((marker, i) => {
            /*Put the <Marker> in the map instead of outside*/
            return <Marker
              lat={marker.location.lat}
              lng={marker.location.lng}
              image={'/marker.png'}
              key={marker + i}
              id={marker.id}
              className={this.props.listingHover === marker.id ? "marker markerHover" : "marker"}
              href={'/GoogleMap' + marker.id} />
          })}
          {
            <Marker
            lat={this.currentLocation.lat}
            lng={this.currentLocation.lng}
            image={'/marker.png'}
            key='currnetLocation'
            id='currentLocation' />
          }
          


        </GoogleMapReact>
      </div>
    );
  }
}

//This connects your component to your reducer
function mapStateToProps(appState) {
  console.log(appState)
  return {
    markers: appState.looReducer.markers,
    listingHover: appState.looReducer.listingHover
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    timeout: 30000,
  },
  userDecisionTimeout: 10000,
})(connect(mapStateToProps)(GoogleMap));