import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import store from '../store'

import Welcome from './Welcome'
import GoogleMap from './GoogleMap'
import MainMap from './MainMap'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={Welcome} />
            <Route path="/GoogleMap" exact component={GoogleMap} />
            <Route path="/MainMap" exact component={MainMap} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
