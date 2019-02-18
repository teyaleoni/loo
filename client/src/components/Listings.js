import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGoogleMarkers, activeListing, getListing } from '../actions/looActions'
import '../styles/mainmap.css'
import { Link } from 'react-router-dom'

class Listings extends Component {
  componentDidMount() {
    getGoogleMarkers()
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
                <Link key=
                  {'listing' + listing.id} to={`/listing/${listing.place_id}`}>
                    <div id={listing.id}
                      ref = { this.props.hover === listing.id ? "shouldScroll": "" } 
                      className={ this.props.hover === listing.id ? "listingBox listingBoxHover": "listingBox" } 
                      onMouseOver={(e) => this.handleMouseOver(e, listing.id)}
                      onMouseOut={(e) => this.handleMouseOut(e, listing.id)} >
                        <p id="name3">{listing.name}</p>
                        <p id="addy3">{listing.formatted_address}</p>
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
   }
}

export default connect(mapStateToProps)(Listings)