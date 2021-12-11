import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class RegisterHandler{

    constructor(){}


    register(user) {
        const url = `${API_URL}/register/`;
        return axios.post(url,user);
    }
 }