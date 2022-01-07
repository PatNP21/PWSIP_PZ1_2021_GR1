import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Draw_it from './../Draw_it.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import countUsers from './HomeHandler'
import LoggedHeader from './Headers/LoggedHeader'
import DefaultHeader from './Headers/DefaultHeader'
import './Home.css'
import Postlist from './PostList/PostList'
import LoginHandler from './LoginHandler'
import PostHandler from './PostHandler'
import Card from './UI/Card'
import PostItem from './PostList/PostItem'

const postHandler = new PostHandler()
const loginHandler = new LoginHandler()


function Home() {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const c = cookies.get("sessionId")
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    let postArray = []
    const user = useParams()
    //getUsersCount()

    useEffect(() => {
        postHandler.getselfPosts(c).then(
            (data) => {
                console.log(data.data.posts)
                for (let i=0; i<data.data.posts.length; i++) {
                    postArray.push(data.data.posts[i])
                }
                
            }
        )
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
        console.log(postArray)
      }, [])

    const createAPost = () => {
        postHandler.createPost(c, content, image).then(res => {
            console.log(res)
            
        }).catch(() => console.log(postArray))
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
                        <div className="createPostBtn" onChange={e => setImage(URL.createObjectURL(e.target.files))}>
                            <label for="filetopost">
                                <BsFillPlusCircleFill/>
                            </label>
                        </div>
                        <input type="file" id="filetopost"/>
                        <button onClick={createAPost}>Dodaj</button>
                    </div>
                </Card>
                
                <div className="profilePosts">
                    <Postlist data={postArray}/>
                    
                </div>
            </main>
            
        </div>
    )
}

export default Home
