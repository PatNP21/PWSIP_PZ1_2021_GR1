import React, { Component, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Login.css'
import LoginHandler from './LoginHandler'

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
        loginHandler.checkLoginStatus().then((result) =>{
            console.log(result.data)
            if (result.data.loggedin == true)
            {
                return (<Navigate to =  '/home'/>)
            }
            else
            {
                console.log("nom")
            }
            
        })
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
        loginHandler.login({
            username: this.state.usedLogin,
            password: this.state.usedPassword
        })
    }
    render()
    {
        return(
            <div className="plot">
            <div className="loginPanel">
                <input className="inputLog login" type="text" placeholder="Login" onChange={(e) => this.setUsedLogin(e.target.value)}/><br/>
                <div className="inputLog">
                    <input className="password" type={this.state.type} placeholder="Hasło" onChange={(e) => this.setUsedPassword(e.target.value)}/>
                    <i className="fa fa-eye" aria-hidden="true" onClick={this.changeTypeOfInput.bind(this)}>x</i>
                </div>
                <p className="forgottenPasswordLink"><Link to="/retrievePassword">Nie pamiętasz hasła?</Link></p><br/>
                <button className="inputLogSub" onClick = {this.handleLogin.bind(this)}>Zaloguj się</button><br/>
                <p>lub</p>
                <p><Link to="/register">Załóż nowe konto</Link></p>
            </div>
        </div>
        )
    }
}