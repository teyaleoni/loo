import React, { Component } from 'react'
import GoogleMap from './GoogleMap'
import Listings from './Listings'
import '../styles/mainmap.css'



class MainMap extends Component {
    render() {
        return(
            <div className="MainMapContainer">
                <header id="header">Loo</header>
                    <div className="Content">
                        <GoogleMap />
                        <Listings />
                    </div>
                <footer></footer>   
            </div>
        )
    }
}

export default MainMap