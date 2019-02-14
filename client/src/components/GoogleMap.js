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
  }

  handleMouseOut = (e) => {
    activeHover({})
}
  render() {
    return (
      <img  
        className={this.props.className}
        src={this.props.image} 
        height="45" 
        width="45"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      />
    )
  }
}
 
class GoogleMap extends Component {
  /* action */
  componentDidMount() {
    getGoogleMarkers()
  }
  

  static defaultProps = {
    center: {
      lat: 36.1684266,
      lng: -115.132405
    },
    zoom: 14
  };

 
  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '645px', width: '65%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAVJoGr5pyaGNsc0XpbOCYGB3EfKjxXuc4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom} >
        

            {this.props.markers.map(( marker, i )=> {
              /*Put the <Marker> in the map instead of outside*/
              console.log(this.props.listingHover === marker.id);
              return <Marker 
                lat={marker.latitude}
                lng={marker.longitude}
                image={'/icon.png'}
                key={marker + i}
                id={marker.id} 
                className={ this.props.listingHover === marker.id ? "marker markerHover": "marker" } />
            })}

          
        </GoogleMapReact>
      </div>
    );
  }
}

//This connects your component to your reducer
function mapStateToProps(appState) {
  return {
    markers: appState.looReducer.markers,
    listingHover: appState.looReducer.listingHover
  }
}
 
export default connect(mapStateToProps)(GoogleMap);