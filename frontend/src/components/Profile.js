import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Profile.css'
import avatar from './../avatar.png'
import Cookies from 'universal-cookie'
import Draw_it from './../Draw_it.png'

function Profile() {

    const [username, setUsername] = useState()
    const [usedFirstName, setUsedFirstName] = useState()
    const [usedLastName, setUsedLastName] = useState()
    const {  } = useParams()

    useEffect(() => {
        setUsername('Leśny dziadek')
    })

    return (
        <div className="allPage">
            <header>
                <div id="logo_of_brand">
                </div>
            </header>
            <aside>
                <div id="logo_of_brand">
                    <img src={Draw_it}/>
                </div>
                <div className="values">
                    Lista statystyk
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
