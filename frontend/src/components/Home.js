import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Draw_it from './../Draw_it.png'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import countUsers from './HomeHandler'
import LoggedHeader from './Headers/LoggedHeader'
import DefaultHeader from './Headers/DefaultHeader'
import './Home.css'

const getUsersCount = () => {
    //console.log(countUsers())
}



const Post = () => {
    return (
        <div className="post">
            <h1>TU będzie kurrrwa post!</h1>
        </div>
    )
}

function Home() {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const c = cookies.get("sessionId")
    //getUsersCount()

    return (
        <div>
            <header>
                {c ? <LoggedHeader/> : <DefaultHeader/>}
            </header>
            <aside>
                <div id="logo_of_brand">
                    <img src={Draw_it}/>
                    
                </div>
                <div className="values">
                    Lista statystyk
                </div>
            </aside>
            <main className="mainHome">
                <div className="createAPost">
                    <input type="text" placeholder="Write a post"/>
                    <button>Dodaj</button>
                </div>
                <div className="profilePosts">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </main>
            
        </div>
    )
}

export default Home
