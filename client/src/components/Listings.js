import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGoogleMarkers, activeListing } from '../actions/looActions'
import '../styles/mainmap.css'
import { Link} from 'react-router-dom'

class Listings extends Component {
  componentDidMount() {
    getGoogleMarkers()
  }

  componentWillUpdate() {
    var node = this.refs.listings
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight + 4
  }
  
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
        var node = this.refs.listings
        node.scrollTop = node.scrollHeight
    }
  }

  handleMouseOver = (e, listing_id) => {
    // console.log(this.props.id) 
    activeListing(listing_id)
  }

  handleMouseOut = (e, listing_id) => {
    activeListing({})
  }

  render() {

    return (
        <div id="roomwrap" ref="listings">
            <div id="room">
                {this.props.markers.map(listing => (
                <Link key=
                  {'listing' + listing.id} to={`/listing/${listing.id}`}>
                    <div className={ this.props.hover === listing.id ? "listingBox listingBoxHover": "listingBox" } 
                      onMouseOver={(e) => this.handleMouseOver(e, listing.id)}
                      onMouseOut={(e) => this.handleMouseOut(e, listing.id)} >
                        <p id="name3">{listing.name}</p>
                        <p id="addy3">{listing.address}</p>
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