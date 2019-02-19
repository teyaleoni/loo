import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
/* import action */
import { getGoogleMarkers, activeHover } from '../actions/looActions'
import '../styles/googlemap.css'


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

  /* action */
  componentDidMount() {
    window.addEventListener('resize', this.changeHeight)

    getGoogleMarkers()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeHeight)
  }

  changeHeight = (e) => {
    this.setState({
      height: window.innerHeight - 110
    })
  }

  static defaultProps = {
    center: {
      lat: 36.158522,
      lng: -115.152391
    },
    zoom: 14
  };


  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.state.height, width: '65%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAVJoGr5pyaGNsc0XpbOCYGB3EfKjxXuc4' }}
          defaultCenter={this.props.center}
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

export default connect(mapStateToProps)(GoogleMap);