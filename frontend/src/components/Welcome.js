import React from 'react'
import './Welcome.css'
import {Link} from 'react-router-dom'

function Welcome() {
    return (
        <div className="plot">
            <div className="slogan">
                <h2>Twórz i korzystaj</h2>
            </div>
            <div className="menu_of_buttons">
                <Link to="/login"><button className="menuBtn login">Login</button></Link>
                <Link to="/register"><button className="menuBtn register">Register</button></Link>
            </div>
        </div>
    )
}

export default Welcome
