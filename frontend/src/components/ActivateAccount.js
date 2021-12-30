import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link} from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import './NewPassword.css'
import RegisterHandler from './RegisterHandler'

const registerHandler = new RegisterHandler()

function ActivateAccount() {

    const {code} = useParams()
    useEffect(() => {
        registerHandler.activateAccount(code).then((res) => {
            console.log(res.data)
        })
    },[])

    return (
        <div>
            <h2>Twoje konto zostało aktywowane, możesz przejść do sekcji logowania</h2>
            <Link to="/login"><p>Zaloguj</p></Link>
        </div>
    )
}

export default ActivateAccount
