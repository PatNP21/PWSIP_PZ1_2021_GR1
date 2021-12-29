import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class LoginHandler{

    constructor(){}


    login(username,password) {
        const url = `${API_URL}/login/`;
        return axios.post(url,{
            "username" : username,
            "password" : password
        });
    }
    checkLoginStatus(sessionid)
    {
        const url = `${API_URL}/login/loggedin/`;
        return axios.post(url,{
            "sessionid" : sessionid
        });
    }
    logout(sessionid)
    {
        const url = `${API_URL}/login/logout/`;
        return axios.post(url,{
            "sessionid" : sessionid
        });
    }
 }