import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './Profile.css'
import avatar from './../avatar.png'
import Cookies from 'universal-cookie'
import Draw_it from './../Draw_it.png'
import LoginHandler from './LoginHandler'
import ProfileHandler from './ProfileHandler'
import ProfileData from './Elements/ProfileData'
import ChangeData from './ChangeData'
import Card from './UI/Card'
import PostHandler from './PostHandler'
import Postlist from './PostList/PostList'

const loginHandler = new LoginHandler()
const profileHandler = new ProfileHandler()
const postHandler = new PostHandler()

function Profile() {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const c = cookies.get("sessionId")

    const [username, setUsername] = useState()
    const [friendsArray, setFriendsArray] = useState([])
    const [editing, setEditing] = useState(false)
    const user = useParams()

    const edit = () => {
        setEditing(true)
    }

    const saveChanges = () => {
        setEditing(false)
    }

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
                postHandler.getselfPosts(c).then(
                    (data) => console.log(data)
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
                <Card>
                    {editing ? <ChangeData click={saveChanges}/> : <ProfileData avatar={avatar} username={username} click={edit}/>}
                </Card>
                
                <div className="profilePosts">
                    <Postlist/>
                </div>
            </section>
            
        </div>
    )
}

export default Profile
