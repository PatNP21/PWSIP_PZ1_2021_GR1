import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import LoginHandler from '../LoginHandler'
const loginHandler = new LoginHandler()
function LoggedHeader() {

    const navigate = useNavigate()
    const cookies = new Cookies
    const c = cookies.get("sessionId")

    const logout = () => {
        loginHandler.logout(c).then( () =>
        {
            cookies.remove('sessionId')
            navigate('/login')
            console.log('Wylogowano')
        })
        
    }

    return (
        <div>
            <a onClick={logout}>Wyloguj</a>
        </div>
    )
}

export default LoggedHeader
