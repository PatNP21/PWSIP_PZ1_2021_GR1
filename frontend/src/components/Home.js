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
import HomeHandler from './HomeHandler'
import Card from './UI/Card'
import PostItem from './PostList/PostItem'

const postHandler = new PostHandler()
const loginHandler = new LoginHandler()
const homeHandler = new HomeHandler()

function Home() {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const c = cookies.get("sessionId")
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [postArray, setPostArray] = useState([])
    const [comments, setComments] = useState([])
    const [profilesStats, updateProfilesStats] = useState(0)
    const [init,setInit] = useState(false)
    const user = useParams()
    //getUsersCount()

    useEffect(() => {
        if(!init)
        {
            postHandler.getPosts(1).then(
                (data) => {
                    console.log(data)
                    setInit(true)
                    setPostArray(data.data.posts)
                    
                }
            )
            homeHandler.countUsers().then(data => {
                updateProfilesStats(data.data.count)

            })
        }
        
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
        console.log(image)
      },[image])


    const createAPost = () => {
        postHandler.createPost(c, content, image).then(res => {
            console.log(res)
            
        })
        postHandler.getPosts(1).then(
            (data) => {
                console.log(data)
                setInit(true)
                setPostArray(data.data.posts)
                for (let i=0; i<data.data.posts.length; i++) {
                    postArray.push(data.data.posts[i])
                    setComments(postArray.comments)
                }
                console.log(comments)
                
            }
        )
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
                        <p>Użytkowników zarejestrowanych</p>
                        <h4 className="userscount">{profilesStats}</h4>
                        
                    </div>
                    <div className="toProfile">
                        <Link to="/profile">Przejdź do profilu</Link>
                    </div>
                </Card>
                
            </aside>
            <main className="mainHome">
                    <div className="createAPost">
                        <div className="createPostBtn">
                            <label htmlFor="filetopost" title="Dodaj zdjęcie">
                                <BsFillPlusCircleFill/>
                            </label>
                        </div>
                        <input type="text" placeholder="Write a post" onChange={e => setContent(e.target.value)}/>
                       
                        <input type="file" id="filetopost" accept="['image/jpg', 'image/png']" onChange={e => setImage(e.target.files[0])}/>
                        <button onClick={createAPost}>Dodaj</button>
                        <div class="clear:both;"></div>
                    </div>
                
                <div className="profilePosts">
                    <Postlist data={postArray}/>
                </div>
            </main>
            
        </div>
    )
}

export default Home
