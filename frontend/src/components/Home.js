import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Draw_it from './../Draw_it.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import countUsers from './HomeHandler'
import LoggedHeader from './Headers/LoggedHeader'
import DefaultHeader from './Headers/DefaultHeader'
import './Home.css'
import Postlist from './PostList/PostList'
import LoginHandler from './LoginHandler'
import PostHandler from './PostHandler'
import Card from './UI/Card'

const postHandler = new PostHandler()
const loginHandler = new LoginHandler()

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
    const [content, setContent] = useState('')
    const user = useParams()
    //getUsersCount()

    useEffect(() => {
        console.log(c)
        postHandler.getselfPosts(c).then(
        data => {
            console.log(data)
            console.log(data.posts)
            //setPostArray(data.posts)
        })
        let loggedas = null
        loginHandler.checkLoginStatus(String(c)).then(
            (res) => {
                console.log(res)
                if (res.data.loggedin)
                {
                    loggedas = res.data.loggedas
                }
                    
            }
        ).then(() => {
            if (loggedas == user.userek || user.userek == undefined)
            {
                console.log(user.userek)
                
            }
            
        })
        
      }, [])

    const createAPost = () => {
        postHandler.createPost(c, content).then(res => {
            console.log(res)
        })
    }

    return (
        <div>
            <header>
                {c ? <LoggedHeader/> : <DefaultHeader/>}
            </header>
            <aside>
                <Card>
                    <div id="logo_of_brand">
                        <img src={Draw_it}/>
                        
                    </div>
                    <div className="values">
                        Lista statystyk
                    </div>
                </Card>
                
            </aside>
            <main className="mainHome">
                <Card>
                    <div className="createAPost">
                        <input type="text" placeholder="Write a post" onChange={e => setContent(e.target.value)}/>
                        <button onClick={createAPost}>Dodaj</button>
                    </div>
                </Card>
                
                <div className="profilePosts">
                    <Postlist/>
                </div>
            </main>
            
        </div>
    )
}

export default Home
