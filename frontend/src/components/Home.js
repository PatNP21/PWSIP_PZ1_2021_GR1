import React, { useEffect } from 'react'
import Draw_it from './../Draw_it.png'
import { Link } from 'react-router-dom'
import countUsers from './HomeHandler'
import './Home.css'

const getUsersCount = () => {
    //console.log(countUsers())
}

function Home() {

    getUsersCount()

    return (
        <div>
            <header>
                <Link to="/login"><div class="header_btn">Zaloguj się</div></Link>
                <Link to="/register" className="homeRegLink"><a>Załóż konto</a></Link>
                <Link to ="/logout"><a>Wyloguj</a></Link>
            </header>
            <aside>
                <div id="logo_of_brand">
                    <img src={Draw_it}/>
                    
                </div>
                <div className="values">
                    Lista statystyk
                </div>
            </aside>
        </div>
    )
}

export default Home
