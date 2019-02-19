import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getListing, getComments, storeComment } from '../actions/looActions'
import '../styles/App.css'

class Listing extends Component {

  componentDidMount() {
    console.log(this.props);
    getListing(this.props.match.params.place_id)
    getComments(this.props.match.params.place_id)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.place_id !== this.props.match.params.place_id) {
      getListing(newProps.match.params.place_id)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    storeComment(this.props.match.params.place_id, this.state.br_comment)
      getComments(this.props.match.params.place_id)
  }

  handleChange = (e) => {
    this.setState({
      br_comment: e.target.value
    })
  }

  handleClick = e => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="ListingContainer">
        <div id="body1">
          <div id="photo1"><img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400` +
            `&key=AIzaSyAxQF4uwgD1M4D0W7_fj0zQaCppeHaTtC0` +
            `&photoreference=${this.props.current.photos[0].photo_reference}`}
            id="photo2"
            alt="picture of establishment" />
          </div>
          <div id="body2">
            <div id="name1"><h3>Name</h3><p id="name2">{this.props.current.name}</p></div>
            <div id="addy1"><h3>Address</h3><p id="addy2">{this.props.current.formatted_address}</p></div>
            <div id="hours1"><h3>Hours</h3><p id="hours2">{this.props.current.opening_hours.weekday_text}</p></div>
            <div id="commentsbox">
              <h3>Comments</h3>
              <form onSubmit={this.handleSubmit}>
                <textarea onChange={this.handleChange} placeholder="Enter Comment Here"></textarea>
                <div id="commentsContainer">
                  <ul>
                    {this.props.comments.map(comments => (
                      <li id="comments">{comments.br_comment}</li>
                    ))}
                  </ul>
                </div>
                <div id="bigbuttbox">
                  <div className="buttbox">
                    <button className="butt" type="submit">
                      <p>Post Comment</p>
                    </button>
                  </div>
                  <div className="buttbox">
                    <button className="butt" onClick={this.handleClick}>
                      <p>Go Back</p>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(appState) {
  console.log(appState);
  return {
    current: appState.looReducer.currentListing,
    comments: appState.looReducer.comments
  }
}

export default connect(mapStateToProps)(Listing)
