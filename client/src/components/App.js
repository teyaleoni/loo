import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import store from '../store'

import Welcome from './Welcome'
import GoogleMap from './GoogleMap'
import MainMap from './MainMap'
import Listing from './Listing'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="main-app">
            <Route path="/" exact component={Welcome} />
            <Route path="/GoogleMap" exact component={GoogleMap} />
            <Route path="/MainMap" exact component={MainMap} />
            <Route path="/listing/:id" exact component={Listing} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
