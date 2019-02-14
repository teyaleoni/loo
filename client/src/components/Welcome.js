import React, { Component } from 'react'
import '../styles/welcome.css'
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return(
            <div className="welcomeOuterContainer">
                <div class='pin bounce'></div>
                <div class='pulse'></div>
            <Link to = "./MainMap" id="goTo"><p>Find a nearby restroom...</p></Link>
            </div>
        )
    }
}

export default Home