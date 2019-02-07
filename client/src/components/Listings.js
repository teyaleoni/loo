import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGoogleMarkers } from '../actions/looActions'
import '../styles/mainmap.css'
import { Link} from 'react-router-dom'

class Listings extends Component {
  componentDidMount() {
    getGoogleMarkers()
  }

  componentWillUpdate() {
    var node = this.refs.listings
    console.log(node.scrollTop, node.offsetHeight, node.scrollHeight)
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight + 4
  }
  
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
        var node = this.refs.listings
        node.scrollTop = node.scrollHeight
    }
  }

  render() {
    return (
        <div id="roomwrap" ref="listings">
            <div id="room">
                {this.props.markers.map(listing => (
                <Link to={`/listing/${listing.id}`}>
                <div className="listingBox">
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
    console.log(appState)
  return {
    markers: appState.looReducer.markers
   }
}

export default connect(mapStateToProps)(Listings)