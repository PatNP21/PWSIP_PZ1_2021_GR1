import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class LoginHandler{

    constructor(){}


    login(user) {
        const url = `${API_URL}/login/`;
        return axios.post(url,user);
    }
    checkLoginStatus()
    {
        const url = `${API_URL}/login/islogged/`;
        return axios.get(url);
    }
 }