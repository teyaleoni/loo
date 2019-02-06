import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
 /* import action */
import { getGoogleMarkers } from '../actions/looActions'
 
const Markers = ({ image }) => <img src={image} height="45" width="45" />;


 
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
      <div style={{ height: '650px', width: '65%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAVJoGr5pyaGNsc0XpbOCYGB3EfKjxXuc4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        
          {console.log(this.props.markers) /* This was empty so this is a server error*/ } 
            {this.props.markers.map(marker => {
              /*Put the <Marker> in the map instead of outside*/
              return <Markers 
                lat={marker.latitude}
                lng={marker.longitude}
                image={'/icon.png'}
              />
            })}
          
        


         
        </GoogleMapReact>
      </div>
    );
  }
}

//This connects your component to your reducer
function mapStateToProps(appState) {
  return {
    markers: appState.looReducer.markers
  }
}
 
export default connect(mapStateToProps)(GoogleMap);