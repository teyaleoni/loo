import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGoogleMarkers, activeListing, getListingDetails } from '../actions/looActions'
import '../styles/mainmap.css'
<<<<<<< HEAD
import { Link} from 'react-router-dom'
import { join } from 'path';
=======
import { Link } from 'react-router-dom'
>>>>>>> 5018bdac951cfc8617c62ae2fc242fefae48e9eb

class Listings extends Component {
  componentDidMount() {
    getGoogleMarkers().then(() => {
      this.props.markers.map(listing => {
        getListingDetails(listing.place_id);
      });
    });
  }


  handleMouseOver = (e, listing_id) => {
    activeListing(listing_id)
  }

  handleMouseOut = (e, listing_id) => {
    activeListing({})
  }

  render() {

    return (
        <div id="roomwrap" >
            <div id="room">
                {this.props.markers.map(listing => (
<<<<<<< HEAD
                <Link key={'listing' + listing.id} to={`/listing/${listing.place_id}`}>
                    <div className={ this.props.hover === listing.id ? "listingBox listingBoxHover": "listingBox" } 
=======
                <Link key=
                  {'listing' + listing.id} to={`/listing/${listing.place_id}`}>
                    <div id={listing.id}
                      ref = { this.props.hover === listing.id ? "shouldScroll": "" } 
                      className={ this.props.hover === listing.id ? "listingBox listingBoxHover": "listingBox" } 
>>>>>>> 5018bdac951cfc8617c62ae2fc242fefae48e9eb
                      onMouseOver={(e) => this.handleMouseOver(e, listing.id)}
                      onMouseOut={(e) => this.handleMouseOut(e, listing.id)} >
                        <p id="name3">{listing.name}</p>
                        <p id="addy3">{this.props.listing.details[listing.place_id]}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    )
  }
}

function mapStateToProps(appState) {
  return {
    markers: appState.looReducer.markers,
    hover: appState.looReducer.hover,
    listing: appState.looReducer.listing
   }
}

export default connect(mapStateToProps)(Listings)