import React, { useState ,useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import './Login.css'
import LoginHandler from './LoginHandler'

const loginHandler = new LoginHandler();


const Login = () => {

    const cookies = new Cookies()

    const [type, setType] = useState('password')
    const [usedLogin, setUsedLogin] = useState('')
    const [usedPassword, setUsedPassword] = useState('')
    const [errors, setErrors] = useState([])
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
                    if (status)
                    {
                        cookies.set('sessionId', res.data.sessionid, { path: '/' })
                        console.log("All good")
                        navigate('/home')
                    }
                    else
                    {
                        let errors = res.data.errors
                        console.log(errors)
                    }
                    
                }
            ).catch(err => console.log(`ERROR: ${err}`))
            
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
        
        <div className="plot">
            <div className="loginPanel">
                <input className="inputLog login" type="text" placeholder="Login" onChange={(e) => setUsedLogin(e.target.value)}/><br/>
                <input className="inputLog password" type={type} placeholder="Hasło" onChange={(e) => setUsedPassword(e.target.value)}/><br/>
                <Link to = "/retrievePassword" className="forgottenPasswordLink"><p className="forgottenPasswordLink">Nie pamiętasz hasła?</p></Link>
                <button className="inputLogSub" onClick = {handleLogin}>Zaloguj się</button><br/>
                <p>lub</p>
                <Link to="/register"><p>Załóż nowe konto</p></Link>
            </div>
        </div>
    )
}

export default Login