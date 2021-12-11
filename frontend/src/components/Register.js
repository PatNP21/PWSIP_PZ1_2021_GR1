import React, { useState } from 'react'
import './Register.css'
import RegisterHandler  from './RegisterHandler'
const registerhandle = new RegisterHandler();
function Register() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')

    const register = () =>{
        registerhandle.register({
            username : login,
            password : password,
            email : email,
            firstname : firstName,
            lastname : lastName,
            DOB : dateOfBirth
        })

    }
    
    const changeTypeOfInput = () => {
        if (type === "password") {
            setType('text')
        } else {
            setType('password')
        }
    }

    return (
        <div className="plot">
            <div className="registerPanel">
                <input className="regInput" type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/><br/>
                <input className="regInput" type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/><br/>
                <input className="regInput" type="date" placeholder="Date of birth" onChange={(e) => setDateOfBirth(e.target.value)}/><br/>
                <input className="regInput" type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/><br/>
                <input className="regInput" type="text" placeholder="Create your login" onChange={(e) => setLogin(e.target.value)}/><br/>
                <div className="regInput">
                    <input className="createPassword" type={type} placeholder="Create your password" onChange={(e) => setPassword(e.target.value)}/>
                    <i class="fa fa-eye register-icon" aria-hidden="true" onClick={changeTypeOfInput}></i>
                </div>
                <div className="regInput">
                    <input className="createPassword" type={type} placeholder="Repeat your password"/>
                    <i class="fa fa-eye register-icon" aria-hidden="true" onClick={changeTypeOfInput}></i>
                </div>
                <button className="inputRegSub" onClick={register}>Utwórz konto</button>
            </div>
        </div>
    )
}

export default Register
