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
import ProfileHandler from './ProfileHandler'
import AdminHandler from './AdminHandler'
import Card from './UI/Card'
import PostItem from './PostList/PostItem'

const postHandler = new PostHandler()
const loginHandler = new LoginHandler()
const homeHandler = new HomeHandler()
const profileHandler = new ProfileHandler()
const adminHandler = new AdminHandler()

function Home() {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const c = cookies.get("sessionId")
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [postArray, setPostArray] = useState([])
    const [comments, setComments] = useState([])
    const [profilesStats, updateProfilesStats] = useState(0)
    const [postsStats, updatePostsStats] = useState(0)
    const [init,setInit] = useState(false)
    const [user, setUser] = useState('')
    const [page,setPage] = useState(1)
    const [more,setMore] = useState(false)
    //const user = useParams()
    //getUsersCount()

    const logout = () => {
        loginHandler.logout(c).then( () =>
        {
            cookies.remove('sessionId')
            navigate('/login')
            console.log('Wylogowano')
        })
    }

    useEffect(() => {
        if(!init)
        {
            postHandler.getPosts(page).then(
                (data) => {
                    console.log(data)
                    setInit(true)
                    setPostArray(data.data.posts)
                    setMore(data.data.more)
                }
            )
            homeHandler.countUsers().then(data => {
                updateProfilesStats(data.data.count)

            })
            homeHandler.countPosts().then(data => {
                updatePostsStats(data.data.count)
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
                profileHandler.myprofile(c).then(data => {
                    console.log(data.data.username)
                    setUser(data.data.username)
                })
            }
            
        })
        console.log(image)
        setTimeout(logout,600000)
      },[image])


    const createAPost = () => {
        postHandler.createPost(c, content, image).then(res => {
            console.log(res)
            
        })
        postHandler.getPosts(page).then(
            (data) => {
                console.log(data)
                setInit(true)
                setPostArray(data.data.posts)
                setMore(data.data.more)
                for (let i=0; i<data.data.posts.length; i++) {
                    postArray.push(data.data.posts[i])
                    setComments(postArray.comments)
                }
                console.log(comments)
                
            }
        )
    }

    const requestNextPage = () => {
        postHandler.getPosts(page+1).then(
            (data) => {
                console.log(data)
                setInit(true)
                setPostArray(data.data.posts)
                setPage(data.data.page)
                setMore(data.data.more)
            })
    }

    const requestPreviousPage = () => {
        postHandler.getPosts(page-1).then(
            data => {
                console.log(data)
                setInit(true)
                setPostArray(data.data.posts)
                setPage(data.data.page)
                setMore(data.data.more)
            }
        )
    }

    return (
        <div>
            <header>
                {c ? <LoggedHeader username={user}/> : <DefaultHeader/>}
            </header>
            <aside>
                <Card>
                    <div id="darkVisual"></div>
                    <div id="logo_of_brand">
                        <img src={Draw_it}/>
                        
                    </div>
                    <div className="values">
                        <p>Użytkowników zarejestrowanych</p>
                        <h4 className="userscount">{profilesStats}</h4>
                    </div>
                    <div className="values">
                        <p>Utworzonych postów</p>
                        <h4 className="userscount">{postsStats}</h4>
                    </div>
                    <div className="toProfile">
                        {c ? <Link to="/profile">Przejdź do profilu</Link> : null}
                    </div>
                </Card>
                
            </aside>
            <main className="mainHome">
                    
                
                <div className="profilePosts">
                    {c && <div className="createAPost">
                        <div className="createPostBtn">
                            <label htmlFor="filetopost" title="Dodaj zdjęcie">
                                <BsFillPlusCircleFill/>
                            </label>
                        </div>
                        <input type="text" placeholder="Write a post" onChange={e => setContent(e.target.value)}/>
                       
                        <input type="file" id="filetopost" accept="['image/jpg', 'image/png']" onChange={e => setImage(e.target.files[0])}/>
                        <button onClick={createAPost}>Dodaj</button>
                        <div class="clear:both;"></div>
                    </div>}
                    {postArray ? <Postlist data={postArray}/> : <p>Nie znaleziono postów</p>}
                    {page > 1 && <div className="postListOption previousPage" onClick={requestPreviousPage}>Poprzednia strona</div>}
                    {more && <div className="postListOption nextPage" onClick={requestNextPage}>Następna strona</div>}
                </div>
            </main>
            
        </div>
    )
}

export default Home
