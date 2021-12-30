import React from 'react'
import { Link } from 'react-router-dom'

function DefaultHeader() {
    
    return (
        <div>
            <Link to="/login"><div class="header_btn">Zaloguj się</div></Link>
            <Link to="/register" className="homeRegLink"><a>Załóż konto</a></Link>
        </div>
    )
}

export default DefaultHeader
