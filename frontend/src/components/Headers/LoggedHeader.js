import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

function LoggedHeader() {

    const navigate = useNavigate()
    const cookies = new Cookies
    const c = cookies.get("sessionId")

    const logout = () => {
        navigate('/login')
        cookies.remove('sessionId')
        console.log('Wylogowano')
    }

    return (
        <div>
            <a onClick={logout}>Wyloguj</a>
        </div>
    )
}

export default LoggedHeader
