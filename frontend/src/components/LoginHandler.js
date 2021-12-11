import axios from 'axios';
import Cookies from 'universal-cookie';
const API_URL = 'http://localhost:8000';

export default class LoginHandler{

    constructor(){}


    login(user) {
        const url = `${API_URL}/login/`;
        return axios.post(url,user).then(response => {
            if(response.data.login == true)
            {
                // generalnie do zmiany po logowaniu zwracamy sessionid i do ciasteczka wrzucamy zrob to jakos ladnue
                let cookies = new Cookies();
                cookies.set("session_id", response.data.sessionid)
            }
        });
    }
    checkLoginStatus()
    {
        const url = `${API_URL}/login/loggedin/`;
        return axios.post(url);
    }
 }