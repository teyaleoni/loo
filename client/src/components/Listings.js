import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGoogleMarkers, activeListing, getListingDetails } from '../actions/looActions'
import '../styles/mainmap.css'
import { Link } from 'react-router-dom'



class Listings extends Component {
  state = {
    height: window.innerHeight - 110
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.changeHeight)
  }

  changeHeight = (e) => {
    this.setState({
      height: window.innerHeight - 110
    })
  }

  componentDidMount() {
    getGoogleMarkers().then(() => {
      this.props.markers.map(listing => {
        getListingDetails(listing.place_id);
      });
    });
    window.addEventListener('resize', this.changeHeight)
  }


  handleMouseOver = (e, listing_id) => {
    activeListing(listing_id)
  }

  handleMouseOut = (e, listing_id) => {
    activeListing({})
  }

  render() {

    return (

      <div id="roomwrap" style={{ height: this.state.height, width: '35%' }}>
        <div className="room">
          {this.props.markers.map((listing, i) => (
            <Link key=
              {'listing' + listing.id + i} to={`/listing/${listing.place_id}`}>
              <div id={listing.id}
                className={this.props.hover === listing.id ? "listingBox listingBoxHover" : "listingBox"}
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