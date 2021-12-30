import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
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
        <div>Konto aktywowane</div>
    )
}

export default ActivateAccount
