import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Login.css'
import LoginHandler from './LoginHandler'
import Draw_it from './../Draw_it.png'

const loginHandler = new LoginHandler();
export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            type: 'password',
            usedLogin: '',
            usedPassword: '',
            errors: []
        }
        
    }
    componentDidMount()
    {
        /*loginHandler.checkLoginStatus().then((result) =>{
            console.log(result.data)
            if (result.data.loggedin == true)
            {
                return (<Navigate to =  '/home'/>)
            }
            else
            {
                console.log("nom")
            }
            
        })*/
    }
    setUsedLogin(param) 
    {
        this.setState({usedLogin: param})
    }
    setUsedPassword(param) 
    {
        this.setState({usedPassword: param})
    }
    changeTypeOfInput()
    {
        this.setState({type: this.state.type === 'password' ? 'text' : 'password'})
    }
    handleLogin()
    {
        try {
            loginHandler.login({
                username: this.state.usedLogin,
                password: this.state.usedPassword
            })
            console.log(`ok! ${this.state.usedLogin} ${this.state.usedPassword}`)
            return (<Navigate to="/home"/>)
        } catch(err) {
            console.log(`Error: ${err}`)
        }
        
       
    }
    render()
    {
        return(
            <div className="plot">
                <div className="loginPanel">
                    <input className="inputLog login" type="text" placeholder="Login" onChange={(e) => this.setUsedLogin(e.target.value)}/><br/>
                    <input className="inputLog password" type={this.state.type} placeholder="Hasło" onChange={(e) => this.setUsedPassword(e.target.value)}/><br/>
                    <Link to = "/retrievePassword"><p className="forgottenPasswordLink">Nie pamiętasz hasła?</p></Link>
                    <button className="inputLogSub" onClick = {this.handleLogin.bind(this)}>Zaloguj się</button><br/>
                    <p>lub</p>
                    <p>Załóż nowe konto</p>
                </div>
            </div>
        )
    }
}