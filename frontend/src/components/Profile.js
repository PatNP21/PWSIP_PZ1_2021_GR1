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
import FriendName from './UI/FriendName'

const loginHandler = new LoginHandler()
const profileHandler = new ProfileHandler()
const postHandler = new PostHandler()

function Profile() {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const c = cookies.get("sessionId")

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [myAccount, setMyAccount] = useState(false)
    const [invited, setInvited] = useState(false)
    const [potentialFriend, setPotentialFriend] = useState()
    const [friendsArray, setFriendsArray] = useState([])
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    //let postArray = []
    let IDs = [] //friends' IDs
    const [editing, setEditing] = useState(false)
    const user = useParams()

    const edit = () => {
        setEditing(true)
    }

    const finishEditing = () => {
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
                    setMyAccount(true)
                    setEmail(res.data.email)
                }).then(() => {
                    profileHandler.get_requests_for_you(c).then(res => {
                        console.log(res)
                        if (res.data.requests.length > 0) {
                            setInvited(true)
                            setPotentialFriend(res.data.requests[0].toString())
                            console.log(potentialFriend)
                        }
                    })
                    postHandler.getselfPosts(c).then(
                        res => {
                            console.log(res)
                            /*for(const el in res.data.posts) {
                                postArray.push(res.data.posts[el])
                            }
                            console.log(postArray)*/
                            setPosts(res.data.posts)
                            /*for (let i=0; i<res.data.posts.length; i++) {
                                posts.push(res.data.posts)
                                setComments(posts[i].comments)
                            }*/
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
            profileHandler.list_of_friends(c).then(
                res => {
                    console.log(res)
                    setFriendsArray(res.data.friends)
                    console.log(friendsArray)
                }
            )
        })
    }, [])

    const addFriend = () => {
        profileHandler.requestFriend(c, user.userek).then(res => {
            console.log('OK my friend')
            console.log(res.data)
        }
            
        ).catch(() => console.log('coś się popsuło'))
        
    }

    const acceptFriend = () => {
        profileHandler.acceptFriend(c, potentialFriend).then(() => {
            console.log('Zaproszenie przyjęte')
        }).catch(err => console.log(err))
    }

    const denyFriend = () => {
        profileHandler.denyFriend(c, potentialFriend).then(() => {
            console.log('Zaproszenie odrzucone')
        }).catch(err => console.log(err))
    }

    return (
        <div className="allPage">
            <header>
                <div id="logo_of_brand">
                    <Link to="/home" className="preturn">Wróc do strony głównej</Link>
                </div>
            </header>
            <aside>
                <Card>
                    <div id="logo_of_brand">
                        <img src={Draw_it}/>
                    </div>  
                </Card>
                
                <Card>
                    <div className="values">
                        <ul className="list_of_friends">
                            {friendsArray.map((item) => 
                                <li className="listFriendsElement" onClick={() => {
                                    profileHandler.getprofilebyusername(user.userek).then(res => {
                                        console.log(res.data)
                                        setUsername(res.data.username)
                                    })
                                }}><FriendName>{item}</FriendName></li>
                            )}
                        </ul>
                    </div>
                </Card>

                {invited 
                    ? <Card>
                        <p>{potentialFriend} zaprosił/a cię do znajomych</p>
                        <button onClick={acceptFriend}>Akceptuj zaproszenie</button>
                        <button onClick={denyFriend}>Odrzuć zaproszenie</button>
                    </Card>: null
                }
            </aside>
            <section>
                <Card>
                    {editing 
                        ? <ChangeData email={email} finishEditing={finishEditing}/>
                        : <ProfileData avatar={avatar} username={username} click={edit} myAccount={myAccount} addFriend={addFriend}/>
                    }
                </Card>
                
                <div className="profilePosts">
                    
                </div>
            </section>
            
        </div>
    )
}

export default Profile
