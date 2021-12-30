import React, { useEffect } from 'react'
import Draw_it from './../Draw_it.png'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import countUsers from './HomeHandler'
import './Home.css'

const getUsersCount = () => {
    //console.log(countUsers())
}

function Home() {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const c = cookies.get("sessionId")
    //getUsersCount()

    const logout = () => {
        navigate('/login')
        cookies.remove('sessionId')
    }

    return (
        <div>
            <header>
                <Link to="/login"><div class="header_btn">Zaloguj się</div></Link>
                <Link to="/register" className="homeRegLink"><a>Załóż konto</a></Link>
                <a onClick={logout}>Wyloguj</a>
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
