import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getListing } from '../actions/looActions'
import '../styles/App.css'

class Listing extends Component {


  componentDidMount() {
    console.log(this.props);
     getListing(this.props.match.params.place_id)
    }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.place_id !== this.props.match.params.place_id) {
        getListing(newProps.match.params.place_id)
    }
  }

  handleClick = e => {
    e.preventDefault()
    this.props.history.goBack()
}

  render() {
    return (
        <div className="ListingContainer">
            <div id="body1">
                <div id="img1"><img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAxQF4uwgD1M4D0W7_fj0zQaCppeHaTtC0&photoreference=${this.props.current.photos[0].photo_reference}`} id="img2" alt="picture of establishment"/></div>
                <div id="body2">
                <div id="name1"><h3>Name</h3><p id="name2">{this.props.current.name}</p></div>
                <div id="addy1"><h3>Address</h3><p id="addy2">{this.props.current.formatted_address}</p></div>
                <div id="hours1"><h3>Hours</h3><p id="hours2">{this.props.current.opening_hours.weekday_text}</p></div>
                <div id="feats1"><h3>Bathroom Description</h3><p id="feats2">{this.props.current.features}</p></div>
                <div id="buttbox"><button id="butt" onClick={this.handleClick}><p>Go Back</p></button></div>
                </div>
            </div>
        </div>
    )
  }
}

function mapStateToProps(appState) {
  console.log(appState);
  return {
      current: appState.looReducer.currentListing
   }
}

export default connect(mapStateToProps)(Listing)
