import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import Axios from 'axios'
import './Register.css'
import Cookies from 'universal-cookie'
import RegisterHandler from './RegisterHandler'
import LoginHandler from './LoginHandler'

const loginHandler = new LoginHandler()
const registerHandler = new RegisterHandler()

function Register() {

    const cookies = new Cookies()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [DOB, setDOB] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password') //setting type for password fields ()

    const validator = new SimpleReactValidator()

    const navigate = useNavigate()

    const c = cookies.get("sessionId")

    useEffect(() => {
        if(c)
        {
            loginHandler.checkLoginStatus(c.toString()).then((res) =>{
                if(res.data.loggedin)
                    navigate('/home')
                else
                    cookies.remove("sessionId")
            })
        }
    })
    const registerToSystem = () => {
        const checkValidation = () => {
            if(validator.allValid()) {
                alert("All fields filled properly! It's OK :)")
                return true
            }
            else {
                console.log(validator.showMessages())
                return false
            }
        }

        if (checkValidation) {
            registerHandler.register(username, password, email, firstName, lastName, DOB).then((res) =>
            {
                let errors = res.data.errors
                if (errors == "Brak")
                {
                    navigate("/home")
                }
                else
                {
                    console.log(errors)
                }
            })
        }

    }

    const changeTypeOfInput = () => {
        if (type === "password") {
            setType('text')
        } else {
            setType('password')
        }
    }

    return (
        <div className="allPage">
            <div className="plot">
                <div className="registerPanel">
                    <div className="regFormGroup">
                        <input className="regInput" type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/><br/>
                        {validator.message('firstName', firstName, 'required|alpha')}
                    </div>
                    <div className="regFormGroup">
                        <input className="regInput" type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/><br/>
                        {validator.message('lastName', lastName, 'required|alpha')}
                    </div>
                    <div className="regFormGroup">
                        <input className="regInput" type="date" placeholder="Date of birth" onChange={(e) => setDOB(e.target.value)}/><br/>
                        {validator.message('DOB', DOB, 'required|date')}
                    </div>
                    <div className="regFormGroup">
                        <input className="regInput" type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/><br/>
                        {validator.message('email', email, 'required|email')}
                    </div>
                    <div className="regFormGroup">
                        <input className="regInput" type="text" placeholder="Create your username" onChange={(e) => setUsername(e.target.value)}/><br/>
                        {validator.message('username', username, 'required|date')}
                    </div>
                    <div className="regFormGroup">
                        <input className="regInput" type={type} placeholder="Create your password" onChange={(e) => setPassword(e.target.value)}/>
                        {validator.message('password', password, 'required|min:6')}
                    </div>
                    <div className="regFormGroup">
                        <input className="regInput" type={type} placeholder="Repeat your password"/>
                    </div>
                    <button className="inputRegSub" onClick={registerToSystem}>Utwórz konto</button>
                </div>
            </div>
        </div>
        
    )
}

export default Register
