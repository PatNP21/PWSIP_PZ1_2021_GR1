import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './ChangeData.css'
import avatar from './../avatar.png'
import Cookies from 'universal-cookie'
import Draw_it from './../Draw_it.png'
import LoginHandler from './LoginHandler'
import ProfileHandler from './ProfileHandler'

const loginHandler = new LoginHandler()
const profileHandler = new ProfileHandler()

function ChangeData() {
    const cookies = new Cookies()
    const c = cookies.get("sessionId")

    const [username, setUsername] = useState()
    const [friendsArray, setFriendsArray] = useState([])
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
                }).then(() => {
                    profileHandler.list_of_friends(c).then(
                        res => {
                            console.log(res)
                            setFriendsArray(res.data.friends)
                            console.log(friendsArray)
                        }
                    )
                }

                )
            }
            else
            {
                profileHandler.getprofilebyusername(user.userek).then(res => {
                    console.log(res.data)
                    setUsername(res.data.username)
                })
            }
        })
    }, [])

    return (
        <div className="allPage">
            <header>
                <div id="logo_of_brand">
                    <Link to="/home" className="preturn">Wróc do strony głównej</Link>
                </div>
            </header>
            <aside>
                <div id="logo_of_brand">
                    <img src={Draw_it}/>
                </div>
                <div className="values">
                    <ul className="list_of_friends">
                        {friendsArray.map((item) => 
                            <li>{item}</li>
                        )}
                    </ul>
                </div>
            </aside>
            <section>
                <div className="edit-profile">
                    <input type="text" placeholder=""/>
                    <input type="text" placeholder="change first name"/>
                    <input type="date" placeholder="change first name"/>
                </div>
            </section>
            
        </div>
    )
}

export default ChangeData
