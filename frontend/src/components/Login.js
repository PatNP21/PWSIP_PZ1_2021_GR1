import React, { useState ,useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {FaRegEye} from 'react-icons/fa'
import Cookies from 'universal-cookie'
import './Login.css'
import LoginHandler from './LoginHandler'

const loginHandler = new LoginHandler();


const Login = () => {

    const cookies = new Cookies()

    const [type, setType] = useState('password')
    const [usedLogin, setUsedLogin] = useState('')
    const [usedPassword, setUsedPassword] = useState('')
    const [errors, setErrors] = useState(false)
    const [errorContent, setErrorContent] = useState('')
    //const [sessionId, setSessionId] = useState()
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

    const handleLogin = () => 
    {
        try {
            loginHandler.login(usedLogin, usedPassword).then(
                (res) => {
                    let status = res.data.login
                    console.log(res.data)
                    setErrorContent(res.data.errors)
                    if (status)
                    {
                        if(errors) {
                            setErrors(false)
                        }
                        cookies.set('sessionId', res.data.sessionid, { path: '/' })
                        cookies.set('user', res.data.username, {path: "/"})
                        console.log("All good")
                        navigate('/home')
                    }
                    else
                    {
                        let errors = res.data.errors
                        console.log(errors)
                        setErrors(true)
                    }
                    
                }
            ).catch(err => {
                console.log(`ERROR: ${err}`)
                setErrors(true)
            })
            
        } catch(err) {
            console.log(`Error: ${err}`)
        }  
    }

    const changeTypeOfInput = () =>
    {
        if (type === "password") {
            setType('text')
        } else {
            setType('password')
        }
    }

    return(
        <div>
            <header>
                <div id="logo_of_brand">
                    <Link to="/home" className="preturn">Wróc do strony głównej</Link>
                </div>
            </header>
            <div className="plot">
                <div className="loginPanel">
                    <div className="logFormGroup">
                        <input className="inputLog login" type="text" placeholder="Login" onChange={(e) => setUsedLogin(e.target.value)}/><br/>
                    </div>
                    <div className="logFormGroup">
                        <input className="inputLog password" type={type} placeholder="Hasło" onChange={(e) => setUsedPassword(e.target.value)}/>
                        <FaRegEye onClick={changeTypeOfInput} className="eyeIcon"/>
                    </div>
                    
                    <Link to = "/retrievePassword" className="forgottenPasswordLink"><p className="forgottenPasswordLink">Nie pamiętasz hasła?</p></Link>
                    <button className="inputLogSub" onClick = {handleLogin}>Zaloguj się</button><br/>
                    <p>lub</p>
                    <Link to="/register"><p>Załóż nowe konto</p></Link>
                    {errors ? <p>{errorContent}</p> : null}
                </div>
            </div>
        </div>
    )
        
        
}

export default Login