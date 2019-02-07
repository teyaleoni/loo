import React, { Component } from 'react'
import '../styles/welcome.css'
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return(
            <div className="welcomeOuterContainer">
                <div className="welcomeContainer">
                    <img id="loo" src="/Loo.png" />
                </div>
                <Link to = "./MainMap" id="goTo"><p>Go to map</p></Link>
            </div>
        )
    }
}

export default Home