import React, { Component } from 'react'
import GoogleMap from './GoogleMap'
import '../styles/mainmap.css'



class MainMap extends Component {
    render() {
        return(
            <div className="MainMapContainer">
                <header id="header">Loo</header>
                    <div className="Content">
                        <GoogleMap />
                        {/* Listings go here, Make sure to import it at the top*/}
                    </div>
                <footer></footer>   
            </div>
        )
    }
}

export default MainMap