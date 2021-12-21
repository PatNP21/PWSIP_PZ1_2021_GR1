import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class RegisterHandler{

    constructor(){}


    register(username, password, email, firstname, lastname, dateofbirth) {
        const url = `${API_URL}/register/`;
        return axios.post(url,{
            "username": username,
            "password": password,
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "dateofbirth": dateofbirth
        });
    }
    passwordRecoverySend(email) {
        const url = `${API_URL}/register/recoverPassword/`;
        return axios.post(url,{"email":email})
    }
    passwordRecoveryChange(code, newpass) {
        const url = `${API_URL}/register/recoverPassword/recovery/`;
        return axios.post(url,{
            "code": code,
            "newpass": newpass
        })
    }
    activateAccount(code) {
        const url = `${API_URL}/register/activate/`;
        return axios.post(url,{
            "code": code
        })
    }
    
 }  