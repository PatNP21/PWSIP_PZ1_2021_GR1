import React from 'react'
import Draw_it from './../Draw_it.png'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div>
            <header>
                <Link to="/login"><div class="header_btn">Zaloguj się</div></Link>
                <Link to="/register"><a>Załóż konto</a></Link>
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
