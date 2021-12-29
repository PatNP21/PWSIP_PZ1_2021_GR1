import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import './Login.css'
import LoginHandler from './LoginHandler'

const loginHandler = new LoginHandler();


const Logout = () => {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const c = cookies.get("sessionId")
    useEffect(() => {
        if(c)
        {
            loginHandler.logout(c.toString())
            cookies.remove("sessionId")
        }
        navigate("/home")

    })



    return(
        <div className="plot">
            <div className="loginPanel">
                
            </div>
        </div>
    )
}

export default Logout