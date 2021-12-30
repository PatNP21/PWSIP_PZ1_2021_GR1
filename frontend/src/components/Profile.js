import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Profile.css'
import avatar from './../avatar.png'
import Cookies from 'universal-cookie'
import Draw_it from './../Draw_it.png'
import LoginHandler from './LoginHandler'
import ProfileHandler from './ProfileHandler'

const loginHandler = new LoginHandler()
const profileHandler = new ProfileHandler()

function Profile() {
    const cookies = new Cookies()
    const c = cookies.get("sessionId")

    const [username, setUsername] = useState()
    const [usedFirstName, setUsedFirstName] = useState()
    const [usedLastName, setUsedLastName] = useState()
    const user = useParams()

    useEffect((data) => {
        let loggedas = null;
        loginHandler.checkLoginStatus(String(c)).then(
            (res) => {
                console.log(res)
                if (res.data.loggedin)
                {
                    loggedas = res.data.loggedas
                }
                    
            }
        ).then(()=>{
            if(loggedas == null && user.userek == undefined)
            {
                console.log('niezalogowany')
            }
            else if (loggedas == user.userek || user.userek == undefined)
            {
                profileHandler.myprofile(c).then(res => {
                    console.log(res.data)
                    setUsername(res.data.username)
                })
            }
            else
            {
                profileHandler.getprofilebyusername(user.userek).then(res => {
                    console.log(res.data)
                    setUsername(res.data.username)
                })
            }
    })}, [])

    return (
        <div className="allPage">
            <header>
                <div id="logo_of_brand">
                    <Link to="/home">Wróc do strony głównej</Link>
                </div>
            </header>
            <aside>
                <div id="logo_of_brand">
                    <img src={Draw_it}/>
                </div>
                <div className="values">
                    <ul>

                    </ul>
                </div>
            </aside>
            <section>
                <div className="profileData">
                    <div className="avatar">
                        <img src={avatar} />
                    </div>
                    <div className="username_for_profile">
                        <h4>{username}</h4>
                    </div>
                </div>
                <div className="profilePosts"></div>
            </section>
            
        </div>
    )
}

export default Profile
